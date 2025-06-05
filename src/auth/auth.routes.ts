//routing
import { Express } from "express";
import { authController, customerLoginController } from "./auth.controller";


const authRoutes = (app: Express) =>{
    //route
    app.route("/auth/register").post(
        async (req, res, next) =>{
            try {
                await authController(req, res);
            } catch (error) {
                next(error);
            }
        }
    )

    // login route
    app.route ("/auth/login").post(
        async (req, res, next) =>{
            try {
                await customerLoginController(req, res)
            } catch (error) {
                next()
            }
        }
    )
}

export default authRoutes;