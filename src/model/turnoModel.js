import db from "../db/db.js"



async function getAll(filters = {}){
   
    try{
        const connection = await db.getConnection();
        
        let query = "SELECT * FROM turnos";
        const values = [];
        const conditions = [];

        // Construir condiciones dinámicamente
        Object.keys(filters).forEach((key) => {
            conditions.push(`${key} LIKE ?`);
            values.push(`%${filters[key]}%`);
        });

        // Si hay filtros, agregar WHERE a la consulta
        if (conditions.length > 0) {
            query += " WHERE " + conditions.join(" AND ");
        }

        const [result] = await connection.query(query, values);
        return result;
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
   
    try{

        const connection =await db.getConnection()
        let dateValidationQuery = `
            SELECT COUNT(*) AS solapamientos
       FROM turnos
       WHERE dia_turno = ?
         AND (
           hora_turno BETWEEN SUBTIME(?, '00:30:00') AND ?
           OR hora_turno BETWEEN ? AND ADDTIME(?, '00:30:00'));
        `
        const [rows] = await connection.query(dateValidationQuery, [data.dia_turno, data.hora_turno,data.hora_turno,data.hora_turno,data.hora_turno]);

        if (rows[0].solapamientos > 0) {
           
            return {error: true, err: 'No se puede agendar el turno: existe un solapamiento en la franja de 30 minutos.'};
          }
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
    
        return {error:true,message:"error al cargar el turno",err:e}
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