//routing
import { Express } from "express";
import { createCarController, getAllCarController, getCarByIdController, deleteCarController, updateCarController } from "./car.controller";


//CRUD
const carRoutes = (app: Express) => {
    //route
    app.route("/car/newcar").post(
        async (req, res, next) =>{
            try {
                await createCarController(req, res);
            } catch (error: any) {
                next(error)
            }
        }
    )

    //get all Cars
    app.route("/car/allCars").get(
        async (req, res, next) =>{
            try {
                await getAllCarController(req, res);
            } catch (error: any) {
                next(error)
            }
        }
    )

    //get Car by ID
    app.route("/car/:id").get(
        async (req, res, next) =>{
            try {
                await getCarByIdController(req, res);
            } catch (error: any) {
                next(error)
            }
        }
    )
    
    //update car by id
    app.route("/car/update/:id").put(
        async (req, res, next) => {
            try {
                await updateCarController(req, res);
            } catch (error) {
                next(error);
            }
        }
    );    

    //Delete Car by ID
    app.route("/car/delete/:id").delete(
        async (req, res, next) =>{
            try {
                await deleteCarController(req, res);
            } catch (error: any) {
                next(error)
            }
        }
    )

    
}

export default carRoutes;