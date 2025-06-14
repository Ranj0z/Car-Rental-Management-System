//routing
import { Express } from "express";
import { createCarController, getAllCarController, getCarByIdController, deleteCarController, updateCarController, getAllCarsWithMaintenanceController, getAllCarsWithReservationsController } from "./car.controller";


//CRUD
const carRoutes = (app: Express) => {
    //route
    //Add new car
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

    //Get all cars with reservations
    app.route("/car/allCarsWithReservations").get(
        // isAuthenticated,
        // adminRoleAuth, // Both users and admins can access this.
        async (req, res, next) =>{
            try {
                await getAllCarsWithReservationsController(req, res);
                // return 
            } catch (error) {
                next(error);
            }
        }
    )
    
    //Get all cars with Maintenance
    app.route("/car/allCarsWithMaintenance").get(
        // isAuthenticated,
        // adminRoleAuth, // Both users and admins can access this.
        async (req, res, next) =>{
            try {
                await getAllCarsWithMaintenanceController(req, res);
                // return 
            } catch (error) {
                next(error);
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

    //Get Cars by InsuranceID
    // app.route("/car/insurance/:id").get(
    //     async (req, res, next) =>{
    //         try {
    //             await getCarByInsuranceIdController(req, res);
    //         } catch (error: any) {
    //             next(error)
    //         }
    //     }
    // )
    
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