import turnoModel from "../model/turnoModel.js";
import turnoValidator from "../utils/turnoValidator.js";

async function getAll(req,res){
    try{

        const params = req.query
       

        const turnos = await turnoModel.getAll(params,req.user)
        
        res.status(200).json({success:true,message:"resultados obtenidos",data:{resultado:turnos},error:null})
    }catch(e){
        res.status(400).json({error:"error",success:false})
    }

}


async function getById(req,res){
    const id = req.params.id
    try{
       
     
        const turnoById = await turnoModel.getById(id,req.user);
      
         res.status(200).json({success:true,message:"resultados obtenidos",data:{resultado:turnoById},error:null})
    }catch(e){
        res.status(400).json({error:"error en la base de datos",success:false,errpr:e})
    }

}

async function create(req,res){
    const datos = req.body
    

    const usuario = req.user; 


    if (usuario.role === "doctor") {
        datos.doctor_id = usuario.id; 
        
    } else if (usuario.role === "secretario") {
        if (!datos.doctor_id) {
            return res.status(400).json({
                success: false,
                message: "Debe especificar un doctor para asignar el turno",
                data: null,
                error: "Falta doctor_id en el body"
            });
        }
    } else {
        return res.status(403).json({
            success: false,
            message: "No autorizado para crear turnos",
            data: null,
            error: "Usuario sin permisos"
        });
    }


    const validation = turnoValidator(datos)
    if(!validation.success){
        res.status(400).json({success:false,message:"Campos invalidos",data:null,error:validation.errors})
        return
    }
    
    try{
        const crearTurno = await turnoModel.create(datos)

        if(crearTurno.error){
           
            res.status(400).json({success:false,message:"error al crear el turno0",data:null,error:crearTurno.err})
        }else{
            res.status(200).json({success:true,message:"turno creado correctamente",data:null,error:null})
        }
    }catch(e){
        
        res.status(400).json({success:false, message: e})
    }

}

async function deleteById(req,res){
    const {id} = req.body

    try{
        const deleteTurno = await turnoModel.deleteById(id)
        console.log(deleteTurno)
        if(!deleteTurno.error){
            res.status(200).json({success:true,message:"turno eliminado correctamente",data:null,error:null})
        }else{
            res.status(400).json({success:false,message:"error al eliminar el turno",data:null,error:null})
        }
    }catch(e){
        res.status(400).json({success:false,message:"error al eliminar el turno",data:null,error:e})
    }
}


export default {getAll,getById,create,deleteById}