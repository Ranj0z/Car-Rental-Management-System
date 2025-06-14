//routing
import { Express } from "express";
import { createNewMaintenanceController, deleteMaintenanceController, getAllMaintenanceController, getMaintenanceByCarIDController, getMaintenanceByIdController, updateMaintenanceController } from "./maintenance.controller";

//CRUD
const maintenanceRoutes = (app: Express) => {
    //route
    app.route("/maintenance/newMaintenance").post(
        async (req, res, next) =>{
            try {
                await createNewMaintenanceController(req, res);
            } catch (error: any) {
                next(error)
            }
        }
    )

    //get all Reservation
    app.route("/maintenance/allMaintenance").get(
        async (req, res, next) =>{
            try {
                await getAllMaintenanceController(req, res);
            } catch (error: any) {
                next(error)
            }
        }
    )

    //get maintenance by ID
    app.route("/maintenance/:id").get(
        async (req, res, next) =>{
            try {
                await getMaintenanceByIdController(req, res);
            } catch (error: any) {
                next(error)
            }
        }
    )
    //get maintenance by CarID
    app.route("/maintenance/CarID/:id").get(
        async (req, res, next) =>{
            try {
                await getMaintenanceByCarIDController(req, res);
            } catch (error: any) {
                next(error)
            }
        }
    )
    
    //update maintenance by id
    app.route("/maintenance/update/:id").put(
        async (req, res, next) => {
            try {
                await updateMaintenanceController(req, res);
            } catch (error) {
                next(error);
            }
        }
    );    

    //Delete Reservation by ID
    app.route("/maintenance/delete/:id").delete(
        async (req, res, next) =>{
            try {
                await deleteMaintenanceController(req, res);
            } catch (error: any) {
                next(error)
            }
        }
    ) 
}

export default maintenanceRoutes;