// API

import { createReservationService, deleteReservationService, getAllReservationsService, getReservationByCarIDService, getReservationByCustomerIDService, getReservationByReservationIDService, updateReservationService } from "./reservation.service";
import { Request, Response } from "express";

//Create a new reservation
export const createReservationController = async (req: Request, res: Response) =>{
    try {
        const newreservation = req.body;

        const createReservation = await createReservationService(newreservation)
        if (!createReservation) {
            return res.json({message: "New reservation not created"})
        } 
        return res.status(201).json({message: "New Reservation Created!!", newreservation})            
    } catch (error: any) {
        return res.status(500).json({error: error.message})
    }
}

//Get all Reservation
export const getAllReservationsController = async (req: Request, res: Response) =>{
    try {
        const allReservation =req.body;

        const getAllReservations = await getAllReservationsService();
         if (!getAllReservations || getAllReservations.length === 0) {
            return res.status(404).json({message: "No Reservation found"});
        }
        return res.status(200).json({data: getAllReservations});
    
    } catch (error: any) {
        return res.status(500).json({error: error.message})        
    }
}


// get Reservation by id controller
export const getReservationByIdController = async (req: Request, res: Response) => {
    try {
        const id  = parseInt (req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID format"});
        }
        const getReservationByID = await getReservationByReservationIDService(id);
        if (!getReservationByID) {
            return res.status(404).json({message: "Reservation not found"});
        }
        return res.status(200).json({data: getReservationByID});
    } catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}


// Get reservation By CarID
export const getReservationByCarIdController = async (req: Request, res: Response) => {
    try {
        const id  = parseInt (req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID format"});
        }
        const getReservationByID = await getReservationByCarIDService(id);
        if (!getReservationByID) {
            return res.status(404).json({message: "Reservation not found"});
        }
        return res.status(200).json({data: getReservationByID});
    } catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}

// Get reservation By CustomerID
export const getReservationByCustomerIdController = async (req: Request, res: Response) => {
    try {
        const id  = parseInt (req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID format"});
        }
        const getReservationByID = await getReservationByCustomerIDService(id);
        if (!getReservationByID) {
            return res.status(404).json({message: "Reservation not found"});
        }
        return res.status(200).json({data: getReservationByID});
    } catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}


// Update reservation
export const updateReservationController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID format"});
        }
        
        const reservationUpdates = req.body;
        
        // Convert dueDate to Date object if provided
        // if (carUpdates.dueDate) {
        //     carUpdates.dueDate = new Date(carUpdates.dueDate);
        // }

        const updatedMessage = await updateReservationService(id, reservationUpdates);
        if (!updatedMessage) {
            return res.status(404).json({message: "Reservation not found!!"});
        }        
        return res.status(200).json({message: updatedMessage});
    } catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}

// delete reservation controller
export const deleteReservationController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID format"});
        }
        
        const deletedMessage = await deleteReservationService(id);
        if (!deletedMessage) {
            return res.status(404).json({message: "Reservation not found !!!"});
        }
        return res.status(200).json({message: deletedMessage});
    } catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}

