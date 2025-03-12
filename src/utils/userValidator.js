import {z} from "zod"

const usuarioSchema = z.object({
    nombre: z.string().min(1).max(100),
    email: z.string().email().max(255),
    password: z.string().max(255), 
    role: z.enum(["admin", "doctor", "secretario"]).default("doctor"),
  
  });


export default function usuarioValidaor(datos){
    const result = usuarioSchema.safeParse(datos);
  
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