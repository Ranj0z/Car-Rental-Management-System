//API

import { Request, Response } from "express";
import { createInsuranceService, deleteInsuranceService, getAllInsuranceService, getInsuranceByCarIDService, getInsuranceByIDService, updateInsuranceByIDService } from "./insurance.service";

//make insurance controller

export const createInsuranceController = async( req: Request, res: Response) =>{
    try {
        const insurance = req.body;

        const createInsurance = await createInsuranceService(insurance)
        if (!createInsurance) 
            return res.json({message: "Insurance not created successfull"})
            return res.status(201).json({message: "Insurance created successfully!!", insurance})
   
    } catch (error :any) {
        return res.status(500).json({error: "error.message"});
    }
}

//Get all insurance
export const getAllInsuranceController = async(req: Request, res: Response) =>{
    try {
        const allInsurance = await getAllInsuranceService()
        if (!allInsurance || allInsurance.length === 0) {
            return res.status(404).json({message : "No Insurance Found"})
        }
        return res.status(200).json({data: allInsurance})
    } catch (error: any) {
        return res.status(500).json({error: error.message})
    }
}

// get Insurance by id controller
export const getInsuranceByIdController = async (req: Request, res: Response) => {
    try {
        const id  = parseInt (req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID format"});
        }
        const getInsuranceByID = await getInsuranceByIDService(id);
        if (!getInsuranceByID) {
            return res.status(404).json({message: "Insurance not found"});
        }
        return res.status(200).json({data: getInsuranceByID});
    } catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}

//Get insurance by Car ID
export const getInsuranceByCarIdController = async (req: Request, res: Response) => {
    try {
        const id  = parseInt (req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID format"});
        }
        const getInsuranceByCarID = await getInsuranceByCarIDService(id);
        if (!getInsuranceByCarID) {
            return res.status(404).json({message: "Car ID not found"});
        }
        return res.status(200).json({data: getInsuranceByCarID});
    } catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}

//Update Insurance by ID
export const updateInsuranceController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID format"});
        }
        
        const InsuranceUpdates = req.body;
        
        // Convert startDate and endDate to Date object if provided
        if (InsuranceUpdates.startDate) {
            InsuranceUpdates.startDate = new Date(InsuranceUpdates.startDate);
        }
        if (InsuranceUpdates.endDate) {
            InsuranceUpdates.endDate = new Date(InsuranceUpdates.endDate);
        }
        

        const updatedMessage = await updateInsuranceByIDService(id, InsuranceUpdates);
        if (!updatedMessage) {
            return res.status(404).json({message: "Insurance not found !!"});
        }        
        return res.status(200).json({message: updatedMessage});
    } catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}

// delete insurance controller
export const deleteInsuranceController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID format"});
        }
        
        const deletedMessage = await deleteInsuranceService(id);
        if (deletedMessage.length === 0) {
            return res.status(404).json({message: "Insurance not found"});
        }
        return res.status(200).json({message: deletedMessage});
    } catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}
