import turnoModel from "../model/turnoModel.js";
import turnoValidator from "../utils/turnoValidator.js";

async function getAll(req,res){
    try{
        const turnos = await turnoModel.getAll()
        console.log("hola desde controller")
        res.status(200).json({turnos:turnos.result})
    }catch(e){
        res.status(200).json({error:"error"})
    }

}


async function getById(req,res){
    const id = req.params.id
    try{
        const turnoById = await turnoModel.getById(id);
        console.log("logrado")
        res.status(200).json({turnos:turnoById})
    }catch(e){
        res.status(200).json({error:"error"})
    }

}

async function create(req,res){
    const datos = req.body
    
    const validation = turnoValidator(datos)
    if(!validation.success){
        res.status(400).json(validation.errors)
    }
    
    try{
        const crearTurno = await turnoModel.create(datos)

        if(crearTurno.error){
            res.status(400).json({message: crearTurno.message})
        }else{
            res.status(200).json({message: crearTurno.message})
        }
    }catch(e){
        res.status(400).json({message: e})
    }

}

async function deleteById(req,res){
    const {id} = req.body

    try{
        const deleteTurno = await turnoModel.deleteById(id)
        if(deleteById.error){
            res.status(400).json({message: "error al eliminar el turno"})
        }else{
            res.status(200).json({message: "registro eliminado correctamente"})
        }
    }catch(e){
        res.status(400).json({message:"error al eliminar el turno"})
    }
}


export default {getAll,getById,create,deleteById}