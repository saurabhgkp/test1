import { Router } from "express";
import { userData, userRegister, userLogin, userFileRequest } from "../controllers/userController.js";
import { isAuth } from "../middleware/isAuth.js";
const userRoute = Router();

userRoute.get("/", userData);
userRoute.post("/register", userRegister)
userRoute.post("/login", userLogin)
userRoute.post("/userFileRequest", isAuth, userFileRequest)

export default userRoute