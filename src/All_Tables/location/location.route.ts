//routing
import { Express } from "express";
import { addNewLocationController, deleteLocationController, getAllLocationsController, getLocationByCarIdController, getLocationByIdController, updateLocationController } from "./location.controller";

//CRUD
const locationRoutes = (app: Express) => {
    //route
    app.route("/location/newLocation").post(
        async (req, res, next) =>{
            try {
                await addNewLocationController(req, res);
            } catch (error: any) {
                next(error)
            }
        }
    )

    //get all Reservation
    app.route("/location/allLocations").get(
        async (req, res, next) =>{
            try {
                await getAllLocationsController(req, res);
            } catch (error: any) {
                next(error)
            }
        }
    )

    //get location by ID
    app.route("/location/:id").get(
        async (req, res, next) =>{
            try {
                await getLocationByIdController(req, res);
            } catch (error: any) {
                next(error)
            }
        }
    )
    //get location by CarID
    app.route("/location/CarID/:id").get(
        async (req, res, next) =>{
            try {
                await getLocationByCarIdController(req, res);
            } catch (error: any) {
                next(error)
            }
        }
    )
    
    //update location by id
    app.route("/location/update/:id").put(
        async (req, res, next) => {
            try {
                await updateLocationController(req, res);
            } catch (error) {
                next(error);
            }
        }
    );    

    //Delete Reservation by ID
    app.route("/location/delete/:id").delete(
        async (req, res, next) =>{
            try {
                await deleteLocationController(req, res);
            } catch (error: any) {
                next(error)
            }
        }
    ) 
}

export default locationRoutes;