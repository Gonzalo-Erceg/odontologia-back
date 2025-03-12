import express from "express"
import { authorizeRoles } from "../middleware/authRol.js"
import userController from "../controller/userController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"
const userRouter = express.Router()


userRouter.post("/register",authMiddleware,authorizeRoles("admin"),userController.register)
userRouter.post("/login",userController.login)



export default userRouter