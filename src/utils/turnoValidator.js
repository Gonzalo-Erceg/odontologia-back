import { z } from 'zod';


const turnoSchema = z.object({
  dia_turno: z.string().refine(value => !isNaN(Date.parse(value)), {
    message: "El día del turno debe ser una fecha válida",
  }),
  hora_turno: z.string().refine(value => /^([01]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/.test(value), {
    message: "La hora del turno debe tener el formato HH:mm:ss",
  }),
  nombre_completo: z.string().min(1, "El nombre completo no puede estar vacío").max(255, "El nombre completo no puede exceder los 255 caracteres"),
  fecha_nacimiento: z.string().refine(value => !isNaN(Date.parse(value)), {
    message: "La fecha de nacimiento debe ser una fecha válida",
  }),
  sexo: z.enum(['Masculino', 'Femenino', 'Otro']),
  dni: z.string().min(1, "El DNI no puede estar vacío").max(20, "El DNI no puede exceder los 20 caracteres"),
  cobertura: z.enum(['Particular', 'Obra social o prepaga']),
  telefono: z.string().optional().refine(value => value ? /^[0-9]{9,15}$/.test(value) : true, {
    message: "El teléfono debe contener entre 10 y 15 dígitos",
  }),
  email: z.string().email("El email debe tener un formato válido").optional(),
  motivo_consulta: z.string().optional(),
  nro_historial_clinico: z.string().max(50, "El número de historial clínico no puede exceder los 50 caracteres").optional(),
  nombre_completo_titular: z.string().max(255, "El nombre completo del titular no puede exceder los 255 caracteres").optional(),
  nro_afiliado: z.string().max(50, "El número de afiliado no puede exceder los 50 caracteres").optional(),
  nombre_obra_social: z.string().max(255, "El nombre de la obra social no puede exceder los 255 caracteres").optional(),
}).superRefine((data, ctx) => {
  if (data.cobertura === "Obra social o prepaga") {
    if (!data.nombre_completo_titular) {
      ctx.addIssue({
        path: ["nombre_completo_titular"],
        message: "El nombre completo del titular es obligatorio si la cobertura es 'Obra social o prepaga'",
      });
    }
    if (!data.nro_afiliado) {
      ctx.addIssue({
        path: ["nro_afiliado"],
        message: "El número de afiliado es obligatorio si la cobertura es 'Obra social o prepaga'",
      });
    }
    if (!data.nombre_obra_social) {
      ctx.addIssue({
        path: ["nombre_obra_social"],
        message: "El nombre de la obra social es obligatorio si la cobertura es 'Obra social o prepaga'",
      });
    }
  }
});

function turnoValidator(datos) {
  const result = turnoSchema.safeParse(datos);
  
  if (result.success) {
    return { success: true };
  } else {
 
    return {
      success: false,
      errors: result.error.errors.map(error => ({
        path: error.path.join('.'),
        message: error.message,
      }))
    };
  }
}

export default turnoValidator
