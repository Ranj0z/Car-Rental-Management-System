//routing
import { Express } from "express";
import { createReservationController, deleteReservationController, getAllReservationsController, getReservationByCarIdController, getReservationByCustomerIdController, getReservationByIdController, updateReservationController } from "./reservation.controller";


//CRUD
const reservationRoutes = (app: Express) => {
    //route
    app.route("/reservation/newreservation").post(
        async (req, res, next) =>{
            try {
                await createReservationController(req, res);
            } catch (error: any) {
                next(error)
            }
        }
    )

    //get all Reservation
    app.route("/reservation/allReservations").get(
        async (req, res, next) =>{
            try {
                await getAllReservationsController(req, res);
            } catch (error: any) {
                next(error)
            }
        }
    )

    //get reservation by ID
    app.route("/reservation/:id").get(
        async (req, res, next) =>{
            try {
                await getReservationByIdController(req, res);
            } catch (error: any) {
                next(error)
            }
        }
    )
    //get reservation by CarID
    app.route("/reservation/CarID/:id").get(
        async (req, res, next) =>{
            try {
                await getReservationByCarIdController(req, res);
            } catch (error: any) {
                next(error)
            }
        }
    )
    //get reservation by CustomerID
    app.route("/reservation/CustomerID/:id").get(
        async (req, res, next) =>{
            try {
                await getReservationByCustomerIdController(req, res);
            } catch (error: any) {
                next(error)
            }
        }
    )
    
    //update reservation by id
    app.route("/booking/update/:id").put(
        async (req, res, next) => {
            try {
                await updateReservationController(req, res);
            } catch (error) {
                next(error);
            }
        }
    );    

    //Delete Reservation by ID
    app.route("/reservation/delete/:id").delete(
        async (req, res, next) =>{
            try {
                await deleteReservationController(req, res);
            } catch (error: any) {
                next(error)
            }
        }
    )

    
}

export default reservationRoutes;