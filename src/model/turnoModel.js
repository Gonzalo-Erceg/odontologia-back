import db from "../db/db.js"



async function getAll(filter){
   
    try{
        const connection =await db.getConnection()
        let query = "SELECT * FROM turnos"

        const [result] = await connection.query(query)
       
        return result
    }catch(e){
 
        return {error:true,err:e}
    }

}

async function getById(id){
    try{
        const connection =await db.getConnection()
        let query = "SELECT * FROM turnos WHERE id = ?" 

        const [result] =await connection.query(query,[id])

        return {error:false,result:result[0]}
    }catch(e){
        return {error:true,err:e}
    }
}

async function create(data){
    console.log(data)
    try{
        const connection =await db.getConnection()
        let query =  `
        INSERT INTO turnos (
          dia_turno,
          hora_turno,
          nombre_completo,
          fecha_nacimiento,
          sexo,
          dni,
          cobertura,
          telefono,
          email,
          motivo_consulta,
          nro_historial_clinico,
          nombre_completo_titular,
          nro_afiliado,
          nombre_obra_social
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `;
        
        const [result] = await connection.query(query,[ data.dia_turno,
            data.hora_turno,
            data.nombre_completo,
            data.fecha_nacimiento,
            data.sexo,
            data.dni,
            data.cobertura,
            data.telefono,
            data.email,
            data.motivo_consulta,
            data.nro_historial_clinico,
            data.nombre_completo_titular,
            data.nro_afiliado,
            data.nombre_obra_social])

        return {error:false, message:"Se agrego un turno correctamente"}
    }catch(e){
        console.log(e)
        return {error:true,message:"error al cargar el turno"}
    }
}



async function deleteById(id){
    try{
        const connection =await db.getConnection()
        let query = "DELETE FROM turnos WHERE id = ?"


        let [result ]= connection.query(query,[id])
        return {error:false,result:result}
    }catch(e){
        return {error:true,err:e}
    }
}


export default {getAll,getById,create,deleteById}