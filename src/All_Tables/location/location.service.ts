//Location Table

import { eq } from "drizzle-orm";
import db from "../../Drizzle/db";
import { CarTable, LocationTable, TILocation } from "../../Drizzle/schemas";

//Add a new location
export const addNewLocationService = async (location: TILocation) =>{
    await db.insert(LocationTable).values(location);

    return "New Location added successfully"
}

//get all Locations
export const getAllLocationsService = async() =>{
    const getAllLocations = await db.query.LocationTable.findMany();

    return getAllLocations;
}

//Get location by ID
export const getLocationByIDService = async(ID: number) =>{
    const LocationByID = await db.query.LocationTable.findFirst({
        where: eq(LocationTable.LocationID, ID)
    });

    return LocationByID;
}

//get locations by CarID
export const getLocationByCarIDService = async(ID: number) =>{
    const car = await db.query.CarTable.findFirst({
        where: eq(CarTable.CarID, ID)
    });

    if (!car) {
        return "No Car found";
    }

    const Location = await db.query.LocationTable.findFirst({
        where: eq( LocationTable.LocationID, car.CarID),
         with:{
            cars: true,
        }
    })

    const LocationByCarID = Location?.LocationID
    ? await db.query.LocationTable.findMany({
        where: eq(LocationTable.LocationID, Location.LocationID)
      })
    : null;

    return LocationByCarID;
};

//Update Location By ID
export const updateLocationByIDService = async (ID: number, updatedLocation: Partial<TILocation>) =>{
    const [updated] = await db.update(LocationTable)
        .set(updatedLocation)
        .where(eq(LocationTable.LocationID, ID))
        .returning();
    
    if (updated) {
        return "Location Updated successfully ✅"
    }
    return "Location Not updated"
}

//Delete Location By ID
export const deleteLocationByIDService = async(ID: number) =>{
    const deletedLocation = await db.delete(LocationTable)
        .where(eq(LocationTable.LocationID, ID))
        .returning();

    if (deletedLocation.length > 0) {
        return "Location deleted successfully ✅"
    }
    return "Location not deleted"
}