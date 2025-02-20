import {z} from "zod"


const personaSchema = z.object({
    nombre: z.string().max(50, "El nombre no puede superar los 50 caracteres"),
    apellido: z.string().max(50, "El apellido no puede superar los 50 caracteres"),
    dni: z.string().max(20, "El DNI no puede superar los 20 caracteres"),
    telefono: z.string().max(20).nullable().optional(), 
    email: z.string().max(100).email("Debe ser un email válido").nullable().optional(),
    obra_social: z.string().max(100).nullable().optional(),
    notas_adicionales: z.string().nullable().optional(), 
  });
  
  
export default function pacienteValidator(datos) {
    const result = personaSchema.safeParse(datos);
    
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