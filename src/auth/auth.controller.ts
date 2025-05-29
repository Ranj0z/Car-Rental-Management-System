//API

import { createCustomerService } from "./auth.service";
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