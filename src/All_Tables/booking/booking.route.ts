//routing
import { Express } from "express";
import { createBookingController, deleteBookingController, getAllBookingsController, getAllCarsWithBookingsController, getBookingByCarIdController, getBookingByCustomerIdController, getBookingByIdController, getBookingByPaymentIdController, updateBookingController } from "./booking.controller";
import { userRoleAuth } from "../../middleware/bearAuth";


//CRUD
const bookingRoutes = (app: Express) => {
    //route
    app.route("/booking/newbooking").post(
        async (req, res, next) =>{
            try {
                await createBookingController(req, res);
            } catch (error: any) {
                next(error)
            }
        }
    )

    //get all Bookings
    app.route("/booking/allBookings").get(
        async (req, res, next) =>{
            try {
                await getAllBookingsController(req, res);
            } catch (error: any) {
                next(error)
            }
        }
    )

    //get booking by ID
    app.route("/booking/:id").get(
        userRoleAuth,
        async (req, res, next) =>{
            try {
                await getBookingByIdController(req, res);
            } catch (error: any) {
                next(error)
            }
        }
    )
    //get booking by CarID
    app.route("/booking/CarID/:id").get(
        async (req, res, next) =>{
            try {
                await getBookingByCarIdController(req, res);
            } catch (error: any) {
                next(error)
            }
        }
    )
    //get booking by CustomerID
    app.route("/booking/CustomerID/:id").get(
        async (req, res, next) =>{
            try {
                await getBookingByCustomerIdController(req, res);
            } catch (error: any) {
                next(error)
            }
        }
    )

    // Fetching bookings for all cars
    app.route("/booking/allCarsWithBookings").get(
        async (req, res, next) =>{
            try {
                await getAllCarsWithBookingsController(req, res);
            } catch (error: any) {
                next(error)
            }
        }
    )
        
    // Get bookings By PaymentID
    app.route("/booking/PaymentID/:id").get(
        async (req, res, next) =>{
            try {
                await getBookingByPaymentIdController(req, res);
            } catch (error: any) {
                next(error)
            }
        }
    )

    //update booking by id
    app.route("/booking/update/:id").put(
        async (req, res, next) => {
            try {
                await updateBookingController(req, res);
            } catch (error) {
                next(error);
            }
        }
    );    

    //Delete Booking by ID
    app.route("/booking/delete/:id").delete(
        async (req, res, next) =>{
            try {
                await deleteBookingController(req, res);
            } catch (error: any) {
                next(error)
            }
        }
    )

    
}

export default bookingRoutes;