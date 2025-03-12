import db from "../db/db.js"


async function getAll(filters = {},user){
    console.log(user)
      try{
       
        const connection = await db.getConnection();
        const allowedColumns = [
            "nombre","apellido","dni","telefono","email","obra_social"
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
      
        const query = `SELECT * FROM personas ${filter.length>0 ? `WHERE ${filter.join(' AND ')}`:""}`;
        
        const [result] = await connection.query(query, values);
       
        return result;
        }catch(e){
            console.log(e)
            return {error:true,err:e}
        }
}

async function getById(id){
     try{
            const connection =await db.getConnection()
            let query = "SELECT * FROM personas WHERE id = ?" 
    
            const [result] =await connection.query(query,[id])
    
            return {error:false,result:result[0]}
        }catch(e){
            return {error:true,err:e}
        }
}

async function deleteById(id){
     try{
            const connection =await db.getConnection()
            let query = "DELETE FROM personas WHERE id = ?"
    
    
            let [result ]= connection.query(query,[id])
            return {error:false,result:result}
        }catch(e){
            return {error:true,err:e}
        }
}

async function update(id, data,user) {
    try {
        const connection = await db.getConnection();
        
        let query = `
            UPDATE personas
            SET nombre = ?, 
                apellido = ?, 
              
                telefono = ?, 
                email = ?, 
                obra_social = ?, 
                notas_adicionales = ?
            WHERE id = ?;
        `;

        const [result] = await connection.query(query, [
            data.nombre,
            data.apellido,
        
            data.telefono,
            data.email,
            data.obra_social,
            data.notas_adicionales,
            id
        ]);

        if (result.affectedRows === 0) {
            return { error: true, message: "No se encontró un turno con ese ID" };
        }

        return { error: false, message: "Turno actualizado correctamente" };
    } catch (e) {
        return { error: true, message: "Error al actualizar el turno", err: e };
    }
}


async function searchByDNI(dni) {
    try {
        const connection = await db.getConnection();
        
        let query = `
            SELECT id, dni 
            FROM personas
            WHERE dni LIKE ? 
            LIMIT 10;
        `;

        const [results] = await connection.query(query, [`${dni}%`]);

        return { error: false, data: results };
    } catch (e) {
        return { error: true, message: "Error al buscar DNI", err: e };
    }
}



async function create(data){
     try{
            const connection =await db.getConnection()
            let query =  `
            INSERT INTO personas (
              nombre,
              apellido,
              dni,
              telefono,
              email,
              obra_social,
              notas_adicionales,
              doctor_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?,?);
          `;
            
            const [result] = await connection.query(query,[ data.nombre,
                data.apellido,
                data.dni,
                data.telefono,
                data.email,
                data.obra_social,
                data.notas_adicionales,
                data.doctor_id
            ])
    
            return {error:false, message:"Se agrego un turno correctamente"}
        }catch(e){
        
            return {error:true,message:"error al cargar el turno",err:e}
        }
}

export default {update,create,deleteById,getAll,getById, searchByDNI}