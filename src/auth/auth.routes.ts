//routing
import { Express } from "express";
import { createCustomerController } from "./auth.controller";


const customer = (app: Express) =>{
    //route
    app.route("/auth/register").post(
        async (req, res, next) =>{
            try {
                await createCustomerController(req, res);
            } catch (error) {
                next(error);
            }
        }
    )
}

export default customer;