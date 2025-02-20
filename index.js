import express from "express";
import turnoRouter from "./src/router/turnos.js";
import cors from "cors"
import 'dotenv/config'
import pacientesRouter from "./src/router/pacientes.js";
const app = express()

app.use(cors());
app.use(express.json())



app.use("/turnos",turnoRouter)
app.use("/pacientes",pacientesRouter)

const PORT = process.env.PORT || 3000


app.listen(PORT,()=>{
    console.log(`escuchando en el puerto ${PORT}`)
})