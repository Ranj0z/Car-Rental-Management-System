// API

import { getAllCarsWithMaintenanceService, createCarService, getAllCarsService, getCarByIDService, updateCarService, deleteCarService, getAllCarsWithReservationsService } from "./car.service";
import { Request, Response } from "express";

//Create a new car
export const createCarController = async (req: Request, res: Response) =>{
    try {
        const newcar = req.body;

        const createCar = await createCarService(newcar)
        if (!createCar) {
            return res.json({message: "New car not created"})
        } 
        return res.status(201).json({message: "New Car Created!!", newcar})            
    } catch (error: any) {
        return res.status(500).json({error: error.message})
    }
}

//Get all Cars from CarTable
export const getAllCarController = async (req: Request, res: Response) =>{
    try {
        const allCars =req.body;

        const getAllCars = await getAllCarsService();
         if (!getAllCars || getAllCars.length === 0) {
            return res.status(404).json({message: "No cars found"});
        }
        return res.status(200).json({Cars: getAllCars});
    
    } catch (error: any) {
        return res.status(500).json({error: error.message})        
    }
}

//Get customers with reservations
export const getAllCarsWithReservationsController = async (req: Request, res: Response) => {
    try {
         const carsWithReservations = await getAllCarsWithReservationsService();
        if (!carsWithReservations) {
            return res.status(404).json({message: "Car not found"});
        }
        return res.status(200).json({data: carsWithReservations});
    } catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}

//Get cars with their Maintenance record
export const getAllCarsWithMaintenanceController = async (req: Request, res: Response) => {
    try {
         const carsWithMaintenance = await getAllCarsWithMaintenanceService();
        if (!carsWithMaintenance) {
            return res.status(404).json({message: "Car not found"});
        }
        return res.status(200).json({data: carsWithMaintenance});
    } catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}


// get Car by id controller
export const getCarByIdController = async (req: Request, res: Response) => {
    try {
        const id  = parseInt (req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID format"});
        }
        const getCarByID = await getCarByIDService(id);
        if (!getCarByID) {
            return res.status(404).json({message: "Car not found"});
        }
        return res.status(200).json({data: getCarByID});
    } catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}

// Update car 
export const updateCarController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID format"});
        }
        
        const carUpdates = req.body;
        
        // Convert dueDate to Date object if provided
        if (carUpdates.dueDate) {
            carUpdates.dueDate = new Date(carUpdates.dueDate);
        }

        const updatedMessage = await updateCarService(id, carUpdates);
        if (!updatedMessage) {
            return res.status(404).json({message: "Car not found !!"});
        }        
        return res.status(200).json({message: updatedMessage});
    } catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}

// delete car controller
export const deleteCarController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID format"});
        }
        
        const deletedMessage = await deleteCarService(id);
        if (!deletedMessage) {
            return res.status(404).json({message: "Car not found !!!"});
        }
        return res.status(200).json({message: deletedMessage});
    } catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}


