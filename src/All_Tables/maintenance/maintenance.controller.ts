//API

import { Request, Response } from "express";
import { createNewMaintenanceService, deleteMaintenanceService, getAllMaintenanceService, getMaintenanceByCarIDService, getMaintenanceByIDService, updateMaintenanceService } from "./maintenance.service";
import db from "../../Drizzle/db";

//create New Maintenance controller

export const createNewMaintenanceController = async( req: Request, res: Response) =>{
    try {
        const maintenance = req.body;

        const createNewMaintenance = await createNewMaintenanceService(maintenance)
        if (!createNewMaintenance) {
            return res.json({message: "Maintenance was not created Successfully"})
          }  return res.status(201).json({message: "New maintenance created successfully!!", maintenance})
   
    } catch (error :any) {
        return res.status(500).json({error: "error.message"});
    }
}

//Get all maintenances
export const getAllMaintenanceController = async(req: Request, res: Response) =>{
    try {
        const allMaintenance = await getAllMaintenanceService()
        if (!allMaintenance || allMaintenance.length === 0) {
            return res.status(404).json({message : "No Maintenance Found"})
        }
        return res.status(200).json({data: allMaintenance})
    } catch (error: any) {
        return res.status(500).json({error: error.message})
    }
}

// get Maintenance by id controller
export const getMaintenanceByIdController = async (req: Request, res: Response) => {
    try {
        const id  = parseInt (req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID format"});
        }
        const getMaintenanceByID = await getMaintenanceByIDService(id);
        if (!getMaintenanceByID) {
            return res.status(404).json({message: "Maintenance not found"});
        }
        return res.status(200).json({data: getMaintenanceByID});
    } catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}

// get maintenance by CarID
export const getMaintenanceByCarIDController = async (req: Request, res: Response) =>{
    try {
        const id  = parseInt (req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID format"});
        }
        const MaintenanceByCarID = await getMaintenanceByCarIDService(id);
        if (!MaintenanceByCarID) {
            return res.status(404).json({message :'Maintenance not found'})
        }
        return res.status(200).json({data: MaintenanceByCarID})
    } catch (error: any) {
        return res.status(500).json({error: error.message});
    }
};

// update maintenance by ID
export const updateMaintenanceController = async (req: Request, res: Response) =>{
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID format"});
        }

        const maintenanceUpdates = req.body;
        const updatedMaintenance = await updateMaintenanceService(id, maintenanceUpdates);

        if (!updatedMaintenance) {
            return res.status(404).json({ message: "Maintenance not found"})
        }
        return res.status(200).json({data: updatedMaintenance})

    } catch (error: any) {
        return res.status(500).json({error: error.message});
    }
};

// delete maintenance controller
export const deleteMaintenanceController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID format"});
        }
        
        const deletedMessage = await deleteMaintenanceService(id);
        if (!deletedMessage) {
            return res.status(404).json({message: "Maintenance not found"});
        }
        return res.status(200).json({message: deletedMessage});
    } catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}
