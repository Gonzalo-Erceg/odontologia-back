import express from "express"
import pacientesController from "../controller/pacientesController.js"
import { authorizeRoles } from "../middleware/authRol.js"
import { authMiddleware } from "../middleware/authMiddleware.js"
const pacientesRouter = express.Router()


pacientesRouter.get("/",authMiddleware,authorizeRoles("admin","doctor","secretario"),pacientesController.getAll)
pacientesRouter.get("/:id",authMiddleware,authorizeRoles("admin","doctor","secretario"),pacientesController.getById)
pacientesRouter.post("/",authMiddleware,authorizeRoles("admin","doctor","secretario"),pacientesController.create)
pacientesRouter.put("/:id",authMiddleware,authorizeRoles("admin","doctor","secretario"),pacientesController.update)
pacientesRouter.delete("/",authMiddleware,authorizeRoles("admin","doctor","secretario"),pacientesController.deleteById)



export default pacientesRouter