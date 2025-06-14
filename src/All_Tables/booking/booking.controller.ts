// API

import { createBookingService, deleteBookingService, getAllBookingsService, getAllCarsWithBookingsService, getBookingByCarIDService, getBookingByCustomerIDService, getBookingByIDService, getBookingByPaymentIDService, updateBookingService } from "./booking.service";
import { Request, Response } from "express";

//Create a new booking
export const createBookingController = async (req: Request, res: Response) =>{
    try {
        const newbooking = req.body;

        const createBooking = await createBookingService(newbooking)
        if (!createBooking) {
            return res.json({message: "New booking not created"})
        } 
        return res.status(201).json({message: "New Booking Created!!", newbooking})            
    } catch (error: any) {
        return res.status(500).json({error: error.message})
    }
}

//Get all Bookings 
export const getAllBookingsController = async (req: Request, res: Response) =>{
    try {
        const allBookings =req.body;

        const getAllBookings = await getAllBookingsService();
         if (!getAllBookings || getAllBookings.length === 0) {
            return res.status(404).json({message: "No Bookings found"});
        }
        return res.status(200).json({data: getAllBookings});
    
    } catch (error: any) {
        return res.status(500).json({error: error.message})        
    }
}


// get Booking by id controller
export const getBookingByIdController = async (req: Request, res: Response) => {
    try {
        const id  = parseInt (req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID format"});
        }
        const getBookingByID = await getBookingByIDService(id);
        if (!getBookingByID) {
            return res.status(404).json({message: "Booking not found"});
        }
        return res.status(200).json({data: getBookingByID});
    } catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}


// Get booking By CarID
export const getBookingByCarIdController = async (req: Request, res: Response) => {
    try {
        const id  = parseInt (req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID format"});
        }
        const getBookingByID = await getBookingByCarIDService(id);
        if (!getBookingByID) {
            return res.status(404).json({message: "Booking not found"});
        }
        return res.status(200).json({data: getBookingByID});
    } catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}

// Get booking By CustomerID
export const getBookingByCustomerIdController = async (req: Request, res: Response) => {
    try {
        const id  = parseInt (req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID format"});
        }
        const getBookingByID = await getBookingByCustomerIDService(id);
        if (!getBookingByID) {
            return res.status(404).json({message: "Booking not found"});
        }
        return res.status(200).json({data: getBookingByID});
    } catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}
// Get bookings By PaymentID
export const getBookingByPaymentIdController = async (req: Request, res: Response) => {
    try {
        const id  = parseInt (req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID format"});
        }
        const getBookingByID = await getBookingByPaymentIDService(id);
        if (!getBookingByID) {
            return res.status(404).json({message: "Booking not found"});
        }
        return res.status(200).json({data: getBookingByID});
    } catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}

// Fetching bookings for all cars
export const getAllCarsWithBookingsController = async (req: Request, res: Response) =>{
    try {
        const allBookings =req.body;

        const getAllCarsWithBookings = await getAllCarsWithBookingsService();
         if (!getAllCarsWithBookings || getAllCarsWithBookings.length === 0) {
            return res.status(404).json({message: "No Bookings found"});
        }
        return res.status(200).json({data: getAllCarsWithBookings});
    
    } catch (error: any) {
        return res.status(500).json({error: error.message})        
    }
}


// Update booking
export const updateBookingController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID format"});
        }
        
        const bookingUpdates = req.body;
        const updatedMessage = await updateBookingService(id, bookingUpdates);
        if (!updatedMessage) {
            return res.status(404).json({message: "Booking not found!!"});
        }        
        return res.status(200).json({message: updatedMessage});
    } catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}

// delete booking controller
export const deleteBookingController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID format"});
        }
        
        const deletedMessage = await deleteBookingService(id);
        if (!deletedMessage) {
            return res.status(404).json({message: "Booking not found !!!"});
        }
        return res.status(200).json({message: deletedMessage});
    } catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}

