//API

import { customerLoginService, deleteCustomerService, getAllCustomersService, getAllCustomersWithReservationsService, getCustomerByIDService,  getCustomersWithBookingsAndCarDetails,  registerNewUser,  /*getCustomerByUserIDService,*/ updateCustomerService } from "./customer.service";
import { sendMail } from "../../mails/mailer";
import { Request, Response } from "express";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config"

//create auth conroller

export const authController = async( req: Request, res: Response) =>{
    try {
        const customer = req.body;
        const password = customer.password; 
        const hashedPassword = await bycrypt.hashSync(password, 10);
        customer.password = hashedPassword;

        // Genetare 6 digit verification code
        const verificationCode = Math.floor(1000000 + Math.random() * 999999).toString();
        customer.verificationCode = verificationCode;


        const createCustomer = await registerNewUser(customer)
        if (!createCustomer){ 
            return res.json({message: "User not created"})
        }

        try {
            await sendMail(
                customer.email,
                "verify your account",
                `Hello ${customer.firstName}, your verification code is: ${verificationCode}`,
                `<div>
                    <h2> Hello ${customer.firstName}, </h2>
                    <p> Your verification code is <strong>${verificationCode}</strong></p>
                    <p> Enter this code to verify your account. </p>
                </div>`
            );
        } catch (emailError) {
            console.error("Failed to send registration Email:", emailError);
        }
        return res.status(201).json({message: "New Customer Created!! Verified code sent to email."})
   
    } catch (error :any) {
        return res.status(500).json({error: "error.message: Email not created"});
    }
}

//login user controller
export const customerLoginController = async( req: Request, res: Response) => {
    try {
        const customer = req.body;

        //check if the user exists
        const customerExist = await customerLoginService(customer)
        if(!customerExist){
            return res.status(404).json({message: "Customer not found "});
         }

         //verify password
        const CustomerMatch = await bycrypt.compareSync(customer.password, customerExist.password)
        if(!CustomerMatch){
            return res.status(401).json({message: "Invalid credentials"});
        }

        //create a payload
        const payload = {
            sub: customerExist.email,
            customer_id: customerExist.email,
            first_name: customerExist.firstName,
            last_name: customerExist.lastName,
            role: customerExist.role,
            exp: Math.floor(Date.now() / 1000) + 60 * 60
        }

        //Generate the JWT token
        const secret = process.env.JWT_SECRET as string
        if(!secret){
            throw new Error("JWT_SECRET is not defined in the environment variables");
        }

        const token = jwt.sign(payload, secret)

        //return the token with customer info
        return res.status(200).json({ 
            message: "Login Successful", 
            token,
            customer: {
                customer_id: customerExist,
                first_name: customerExist.firstName,
                last_name: customerExist.lastName,
                email: customerExist.email,
                role: customerExist.role
            }
        })
    } catch (error: any) {
        return res.status(500).json({error: error.message})
    }
}

//Get all customers
export const getAllCustomersController = async(req: Request, res: Response) =>{
    try {
        const allCustomers = await getAllCustomersService()
        if (!allCustomers || allCustomers.length === 0) {
            return res.status(404).json({message : "No Customers Found"})
        }
        return res.status(200).json({data: allCustomers})
    } catch (error: any) {
        return res.status(500).json({error: error.message})
    }
}

// get Customer by id controller
export const getCustomerByIdController = async (req: Request, res: Response) => {
    try {
        const id  = parseInt (req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID format"});
        }
        const getCustomerByID = await getCustomerByIDService(id);
        if (!getCustomerByID) {
            return res.status(404).json({message: "Customer not found"});
        }
        return res.status(200).json({data: getCustomerByID});
    } catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}

//Get customers with reservations
export const getAllCustomersWithReservationsController = async (req: Request, res: Response) => {
    try {
         const customersWithReservations = await getAllCustomersWithReservationsService();
        if (!customersWithReservations) {
            return res.status(404).json({message: "Customer not found"});
        }
        return res.status(200).json({data: customersWithReservations});
    } catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}

//Get customers with their bookings, car and location details
export const getDetailedCustomerBookingsController = async (req: Request, res: Response) => {
  try {
    const custID = parseInt(req.params.custID, 10);

    if (isNaN(custID)) {
      res.status(400).json({ message: "Invalid ID" });
      return;
    }
    const result = await getCustomersWithBookingsAndCarDetails(custID);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching detailed customer bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update customer
export const updateCustomerController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID format"});
        }
        
        const customerUpdates = req.body;

        const updatedMessage = await updateCustomerService(id, customerUpdates);
        if (!updatedMessage) {
            return res.status(404).json({message: "Customer not found!!"});
        }        
        return res.status(200).json({message: updatedMessage});
    } catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}

// delete car controller
export const deleteCustomerController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID format"});
        }
        
        const deletedMessage = await deleteCustomerService(id);
        if (!deletedMessage) {
            return res.status(404).json({message: "Customer not found or not deleted"});
        }
        return res.status(200).json({message: deletedMessage});
    } catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}
