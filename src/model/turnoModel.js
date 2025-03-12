import db from "../db/db.js"



async function getAll(filters = {},user ){
   
    try{
        const connection = await db.getConnection();
       
        const allowedColumns = [
            'dia_turno', 'hora_turno', 'nombre_completo', 'fecha_nacimiento',
            'sexo', 'dni', 'cobertura', 'telefono', 'email', 'motivo_consulta',
            'nro_historial_clinico', 'nombre_completo_titular', 'nro_afiliado',
            'nombre_obra_social', 'doctor_id'
        ];
    
        const filter = [];
        const values = [];
        if(user.role == "doctor"){
            filter.push("doctor_id = ?")
            values.push(user.id)
        }
        Object.entries(filters).forEach(([key, value]) => {
            if (allowedColumns.includes(key)) {
                if (key.includes('dia_turno') || key.includes('fecha_nacimiento')) {
                    
                    filter.push(`${key} = ?`);
                    values.push(value);
                } else {
                  
                    filter.push(`${key} LIKE ?`);
                    values.push(`%${value}%`);
                }
            }
        });
        
        const query = `SELECT * FROM turnos ${filter.length>0 ? `WHERE ${filter.join(' AND ')}`:""}`;
  
        const [result] = await connection.query(query, values);
        return result;
    }catch(e){
        console.log(e)
        return {error:true,err:e}
    }

}

async function getById(id,user){
    try{
        const connection =await db.getConnection()
     
        let query = "SELECT * FROM turnos WHERE id = ?" 
        const [result] =await connection.query(query,id)
        if(result[0].doctor_id !== user.id && user.role == "doctor"){
            return {error:true, err:"no tienes permiso para acceder a este recurso",code:401}
        }
        

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
      AND doctor_id = ?
      AND (
        hora_turno BETWEEN SUBTIME(?, '00:30:00') AND ?
        OR hora_turno BETWEEN ? AND ADDTIME(?, '00:30:00')
      );
`;

        const [rows] = await connection.query(dateValidationQuery, [data.dia_turno, data.doctor_id,data.hora_turno,data.hora_turno,data.hora_turno,data.hora_turno]);

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
          nombre_obra_social,
          doctor_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?);
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
            data.nombre_obra_social,
        data.doctor_id])

        return {error:false, message:"Se agrego un turno correctamente"}
    }catch(e){
    
        return {error:true,message:"error al cargar el turno",err:e}
    }
}



async function deleteById(id){
    try{
        const connection =await db.getConnection()
        let query = "DELETE FROM turnos WHERE id = ?"


        let [result]=await connection.query(query,[id])
        return {error:false,result:result}
    }catch(e){
        return {error:true,err:e}
    }
}


export default {getAll,getById,create,deleteById}