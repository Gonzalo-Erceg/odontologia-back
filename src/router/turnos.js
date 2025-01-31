import express from "express"
import turnosController from "../controller/turnosController.js"

const router = express.Router()



router.get("/",turnosController.getAll)
router.get("/:id",turnosController.getById)
router.post("/",turnosController.create)



export default router