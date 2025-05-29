//routing
import { Express } from "express";
import { createCustomerController, deleteCustomerController, getAllCustomerController, getCustomerByIdController, updateCustomerController } from "./customer.controller";

//CRUD
const customer = (app: Express) => {
    //route
//Create a new Customer
    app.route("/customer/newCustomer").post(
        async (req, res, next) =>{
            try {
                await createCustomerController(req, res);
            } catch (error) {
                next(error);
            }
        }
    )

//Get all customers
    app.route("/customer/allCustomers").get(
        async (req, res, next) =>{
            try {
                await getAllCustomerController(req, res);
                // return 
            } catch (error) {
                next(error);
            }
        }
    )

//get Customer by ID
    app.route("/customer/:id").get(
        async (req, res, next) =>{
            try {
                await getCustomerByIdController(req, res);
            } catch (error: any) {
                next(error)
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
        async (req, res, next) =>{
            try {
                await deleteCustomerController(req, res);
            } catch (error: any) {
                next(error)
            }
        }
    )

    
}

export default customer;

