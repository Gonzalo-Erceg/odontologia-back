import mysql from "mysql2/promise"
import "dotenv/config"

let connection;

let dataConnect = {
    host: process.env.HOST || "localhost",
    user:process.env.USER || "root",
    password:process.env.PASS || "",
    database: process.env.DB || "test"

}


async function getConnection(){
     
    if(!connection){
        try{
            connection = await mysql.createConnection(dataConnect)
            console.log("coneccionn")
        }catch(e){
            console.log(e)
            return null
        }
    
    }
    return connection
}

export default {getConnection}