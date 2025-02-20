import express from "express"
import pacientesController from "../controller/pacientesController.js"

const pacientesRouter = express.Router()


pacientesRouter.get("/",pacientesController.getAll)
pacientesRouter.get("/:id",pacientesController.getById)
pacientesRouter.post("/",pacientesController.create)
pacientesRouter.put("/:id",pacientesController.update)
pacientesRouter.delete("/",pacientesController.deleteById)



export default pacientesRouter