//Location Controller

import { addNewLocationService, deleteLocationByIDService, getAllLocationsService, getLocationByCarIDService, getLocationByIDService, updateLocationByIDService } from "./location.service";
import { Request, Response } from "express";

//Add a new Location 
export const addNewLocationController = async (req: Request, res: Response) =>{
    try {
        const newlocation = req.body;

        const addLocation = await addNewLocationService(newlocation)
        if (!addLocation) {
            return res.json({message: "New location not added"})
        } 
        return res.status(201).json({message: "New Location added!!", newlocation})            
    } catch (error: any) {
        return res.status(500).json({error: error.message})
    }
}

//Get all locations
export const getAllLocationsController = async (req: Request, res:Response ) =>{
    try {
        const allLocations = await getAllLocationsService();
        if (!allLocations || allLocations.length === 0) {
            return res.status(404).json({ message: "No Locations Found"})
        }
        return res.status(200).json({Locations: allLocations});
    } catch (error: any) {
        return res.status(500).json({ error: error.message})
    }
}

//Get Location by ID
export const getLocationByIdController = async (req: Request, res: Response) => {
    try {
        const id  = parseInt (req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID format"});
        }
        const getLocationByID = await getLocationByIDService(id);
        if (!getLocationByID) {
            return res.status(404).json({message: "Location not found"});
        }
        return res.status(200).json({data: getLocationByID});
    } catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}

//Get location by Car ID
export const getLocationByCarIdController = async (req: Request, res: Response) => {
    try {
        const id  = parseInt (req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID format"});
        }
        const getLocationByCarID = await getLocationByCarIDService(id);
        if (!getLocationByCarID) {
            return res.status(404).json({message: "Car ID not found"});
        }
        return res.status(200).json({data: getLocationByCarID});
    } catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}

//Update Location by ID
export const updateLocationController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID format"});
        }
        
        const LocationUpdates = req.body;
        
        // Convert dueDate to Date object if provided
        if (LocationUpdates.dueDate) {
            LocationUpdates.dueDate = new Date(LocationUpdates.dueDate);
        }

        const updatedMessage = await updateLocationByIDService(id, LocationUpdates);
        if (!updatedMessage) {
            return res.status(404).json({message: "Location not found !!"});
        }        
        return res.status(200).json({message: updatedMessage});
    } catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}

//Delete ocation by ID
export const deleteLocationController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID format"});
        }
        
        const deletedMessage = await deleteLocationByIDService(id);
        if (!deletedMessage) {
            return res.status(404).json({message: "Location not found !!!"});
        }
        return res.status(200).json({message: deletedMessage});
    } catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}
