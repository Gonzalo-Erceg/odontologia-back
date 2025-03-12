import express from "express"
import turnosController from "../controller/turnosController.js"
import { authorizeRoles } from "../middleware/authRol.js"
import { authMiddleware } from "../middleware/authMiddleware.js"
const router = express.Router()



router.get("/",authMiddleware,authorizeRoles("admin","doctor","secretario"),turnosController.getAll)
router.get("/:id",authMiddleware,authorizeRoles("admin","doctor","secretario"),turnosController.getById)
router.post("/",authMiddleware,authorizeRoles("admin","doctor","secretario"),turnosController.create)
router.delete("/",authMiddleware,authorizeRoles("admin","doctor","secretario"),turnosController.deleteById)


export default router