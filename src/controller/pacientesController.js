import pacientes from "../model/pacientesModel.js"
import pacienteValidator from "../utils/pacienteValidator.js"



async function getAll(req,res){
    try{
        const params = req.query
        console.log(params)
        const result = await pacientes.getAll(params)
        res.status(200).json({success:true,message:"resultados obtenidos",data:{pacientes:result},error:null})

    }catch(e){
        res.status(400).json({error:"error",success:false,error:e})
    }
}


async function create(req,res){
    const datos = req.body;

    const validator = pacienteValidator(datos)
    if(!validator.success){
        res.status(400).json({success:false,message:"Campos invalidos",data:null,error:validator.errors})
        return
    }

    try{
            const crearTurno = await pacientes.create(datos)
    
            if(crearTurno.error){
               
                if(crearTurno.err.errno == 1062){
                    res.status(400).json({success:false,message:"error al crear el paciente",data:null,error:{code:1062,message:"El campo DNI esta duplicado"}})
                }else{
                    res.status(400).json({success:false,message:"error al crear el paciente",data:null,error:crearTurno.err})
                }

            }else{
                res.status(200).json({success:true,message:"paciente creado correctamente",data:null,error:null})
            }
        }catch(e){
            res.status(400).json({message: e})
        }
}


async function getById(req,res){
      const id = req.params.id
        try{
            const turnoById = await pacientes.getById(id);
          
             res.status(200).json({success:true,message:"resultados obtenidos",data:{resultado:turnoById.result},error:null})
        }catch(e){
            res.status(400).json({error:"error en la base de datos",success:false,errpr:e})
        }
}


async function update(req,res){
    const datos = req.body;
    const id = req.params.id



    try{
            const crearTurno = await pacientes.update(id,datos)
    
            if(crearTurno.error){
               
                if(crearTurno.err.errno == 1062){
                    res.status(400).json({success:false,message:"error al crear el paciente",data:null,error:{code:1062,message:"El campo DNI esta duplicado"}})
                }else{
                    res.status(400).json({success:false,message:"error al crear el paciente",data:null,error:crearTurno.err})
                }

            }else{
                res.status(200).json({success:true,message:"paciente creado correctamente",data:null,error:null})
            }
        }catch(e){
            res.status(400).json({message: e})
        }
}




async function deleteById(req,res){
    const {id} = req.body

    try{
        const deleteTurno = await pacientes.deleteById(id)
        if(!deleteTurno.error){
            res.status(200).json({success:true,message:"turno eliminado correctamente",data:null,error:null})
        }else{
            res.status(400).json({success:false,message:"error al eliminar el turno",data:null,error:null})
        }
    }catch(e){
        res.status(400).json({success:false,message:"error al eliminar el turno",data:null,error:null})
    }
}

export default {getAll,create,getById,update,deleteById}