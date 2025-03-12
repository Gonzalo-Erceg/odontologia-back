import express from "express";
import turnoRouter from "./src/router/turnos.js";
import cors from "cors"
import 'dotenv/config'

import cookieSession from "cookie-session";
import pacientesRouter from "./src/router/pacientes.js";
import userRouter from "./src/router/user.js";
const app = express()

app.use(cors());
app.use(express.json())
app.use(cookieSession({
    name:"session",
    secret:process.env.SECRET_SESSION,
    httpOnly:true
}))


app.use("/turnos",turnoRouter)
app.use("/pacientes",pacientesRouter)
app.use("/usuarios",userRouter)
const PORT = process.env.PORT || 3000


app.listen(PORT,()=>{
    console.log(`escuchando en el puerto ${PORT}`)
})