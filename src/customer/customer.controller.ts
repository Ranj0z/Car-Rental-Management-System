//API

import { createCustomerService, deleteCustomerService, getAllCustomerService, getCustomerByIDService, updateCustomerService } from "./customer.service";
import { Request, Response } from "express";
import bycrypt from "bcryptjs";

//create customer conroller

export const createCustomerController = async( req: Request, res: Response) =>{
    try {
        const customer = req.body;
        //hash Phone Number
        // const phone_number = customer.phone_number; 
        // const hashedNumber = await bycrypt.hashSync(phone_number, 10);
        // customer.phone_number = hashedNumber;

        const createCustomer = await createCustomerService(customer)
        if (!createCustomer) 
            return res.json({message: "User not created"})
            return res.status(201).json({message: "New Customer Created!!", createCustomer})
   
    } catch (error :any) {
        return res.status(500).json({error: "error.message"});
    }
}

//Get all customers
export const getAllCustomerController = async(req: Request, res: Response) =>{
    try {
        const allCustomers = await getAllCustomerService()
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
