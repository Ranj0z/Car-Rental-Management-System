//routing
import { Express } from "express";
import {  authController, customerLoginController, deleteCustomerController, getAllCustomersController, getAllCustomersWithReservationsController, getCustomerByIdController, getDetailedCustomerBookingsController, /*getCustomerByUserIdController,*/ updateCustomerController } from "./customer.controller";
import { adminRoleAuth, bothRoleAuth, userRoleAuth } from "../../middleware/bearAuth";

//Auth Route
const customerRoutes = (app: Express) => {
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

    //Get all customers
    app.route("/customer/allCustomers").get(
        // isAuthenticated,
        bothRoleAuth, // Both users and admins can access this.
        async (req, res, next) =>{
            try {
                await getAllCustomersController(req, res);
                // return 
            } catch (error) {
                next(error);
            }
        }
    )

    //Get all customerswith reservations
    app.route("/customer/allCustomersWithReservations").get(
        // isAuthenticated,
        // adminRoleAuth, // Both users and admins can access this.
        async (req, res, next) =>{
            try {
                await getAllCustomersWithReservationsController(req, res);
                // return 
            } catch (error) {
                next(error);
            }
        }
    )

    //get Customer by ID
    app.route("/customer/:id").get(
        userRoleAuth,
        async (req, res, next) =>{
            try {
                await getCustomerByIdController(req, res);
            } catch (error: any) {
                next(error)
            }
        }
    )

    // get customers with bookings, car and location details
    app.route("/customer/customers-bookings-cars/:custID").get(
        async (req, res, next) => {
           try {
                await getDetailedCustomerBookingsController(req, res)
            } catch (error) {
                next()
            } 
        }
    )

    
    //update customer by id
    app.route("/customer/update/:id").patch(
        async (req, res, next) => {
            try {
                await updateCustomerController(req, res);
            } catch (error) {
                next(error);
            }
        }
    );

    //Delete Customer by ID
    app.route("/customer/delete/:id").delete(
        adminRoleAuth,
        async (req, res, next) =>{
            try {
                await deleteCustomerController(req, res);
            } catch (error: any) {
                next(error)
            }
        }
    )    

    //get Customer by specific ID
    // app.route("/customer/user/:id").get(
    //     userRoleAuth,
    //     async (req, res, next) =>{
    //         try {
    //             await getCustomerByUserIdController(req, res);
    //         } catch (error: any) {
    //             next(error)
    //         }
    //     }
    // )
}

export default customerRoutes;

