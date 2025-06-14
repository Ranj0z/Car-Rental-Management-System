//routing
import { Express } from "express";
import { createInsuranceController, deleteInsuranceController, getAllInsuranceController, getInsuranceByCarIdController, getInsuranceByIdController, updateInsuranceController } from "./insurance.controller";
import { updateLocationController } from "../location/location.controller";

//CRUD
const insuranceRoutes = (app: Express) => {
    //route
//create an Insurance Policy
    app.route("/insurance/createInsurance").post(
        async (req, res, next) =>{
            try {
                await createInsuranceController(req, res);
            } catch (error) {
                next(error);
            }
        }
    )

//Get all insurances
    app.route("/insurance/allInsurance").get(
        async (req, res, next) =>{
            try {
                await getAllInsuranceController(req, res);
                // return 
            } catch (error) {
                next(error);
            }
        }
    )

//get Insurance by ID
    app.route("/insurance/:id").get(
        async (req, res, next) =>{
            try {
                await getInsuranceByIdController(req, res);
            } catch (error: any) {
                next(error)
            }
        }
    )

//Get Insurance by CarID
    app.route("/insurance/car/:id").get(
        async (req, res, next) =>{
            try {
                await getInsuranceByCarIdController(req, res);
            } catch (error: any) {
                next(error)
            }
        }
    )

//Update Insurance By ID
    app.route("/insurance/update/:id").put(
        async (req, res, next) => {
            try {
                await updateInsuranceController(req, res);
            } catch (error) {
                next(error);
            }
        }
    )
    
//Delete Insurance by ID
    app.route("/insurance/delete/:id").delete(
        async (req, res, next) =>{
            try {
                await deleteInsuranceController(req, res);
            } catch (error: any) {
                next(error)
            }
        }
    )    
}

export default insuranceRoutes;

