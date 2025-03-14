import db from "../db/db.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

async function login(email,password){
    try{
        const connection = await db.getConnection()
        let query = `SELECT * FROM usuarios WHERE email = ?`

        const [rows] = await connection.query(query,[email])

        if(rows.length === 0){
            return {success:false, message:"El email o la contraseña son incorrectas",code:401}
        }

        const user = rows[0]

        // if (!user.email_confirmado){
        //     return {success:false, message: "El email no esta confirmado"}
        // }
        const validationPassword = await bcrypt.compare(password, user.password)
        if (!validationPassword) return  {success:false, message:"El email o la contraseña son incorrectas",code:401};
        const token = jwt.sign({id:user.id,role:user.role},process.env.SECRET_JWT)
        
        return {success:true,message:"",data:{token}}


    }catch(e){
        return {success:false,data:{e},code:400}
    }
}

async function register(datos){
    try{
        const connection = await db.getConnection()
        const hashedPassword = await bcrypt.hash(datos.password, 5)
         let query =  "INSERT INTO usuarios (nombre, email, password, role) VALUES (?, ?, ?, ?)"
         const [rows] = await connection.query(query,[datos.nombre,datos.email,hashedPassword,datos.role])
        return {success: true}
    }catch(e){
        console.log(e)
        return {success:false,err:e}
    }
}
export default{login,register}