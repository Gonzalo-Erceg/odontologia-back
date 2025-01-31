import mysql from "mysql2/promise"
import "dotenv/config"

let connection;

let dataConnect = process.env.MYSQL_HOST ? process.env.MYSQL_HOST: {
    host: "localhost",
    user: "root",
    password: "",
    database:  "test"

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