import userModel from "../model/userModel.js";
import usuarioValidator from "../utils/userValidator.js";



async function login(req,res){
    const {email,password} = req.body

    try{
        const response = await userModel.login(email,password)
        if(!response.success){
            return res.status(response.code).json({success:false,message:response.message,err:response.data})
        }

        req.session.token = response.data.token

        res.status(201).json({success:true})
    }catch(e){
        res.status(400).json({success:false,message:"Error en el servidor",err:e})
    }
}

async function register(req,res){

    const validacion = usuarioValidator(req.body)

    if (!validacion.success) {
      return res.status(400).json({ error: validacion.errors });
    }
    const { nombre, email, password, role} = req.body;

    try {
        const response = await userModel.register({nombre,email,password,role})
        if(!response.success){
            return res.status(response.code).json({success:false,message:response.message,err:response.data})
        }

  
      res.status(201).json({success:true, message: "Usuario creado"});
    } catch (e) {
     
      res.status(500).json({ error: "Error en el servidor" ,err:e});
    }
}

export default {login, register}