import { eq } from "drizzle-orm";
import db from "../../Drizzle/db";
import {CarTable, MaintenanceTable, TICar } from "../../Drizzle/schemas";


//Car Table
//Create a new car
export const createCarService = async(newcar :TICar) => {
    await db.insert(CarTable).values(newcar);

    return "Car created successfully";
}

//Get All cars from carTable
export const getAllCarsService = async () =>{
    const allCars = await db.query.CarTable.findMany()
    return allCars;
}


// Get car By CarID
export const getCarByIDService = async (CarID: number) => {
  const carByID = await db.query.CarTable.findFirst({
    where: eq(CarTable.CarID, CarID)
  });
  return carByID;
};


//Get a Car by MaintenanceID
export const getCarByMaintenanceIDService = async (MaintenanceID: number) => {
  const maintenance = await db.query.MaintenanceTable.findFirst({
    where: eq(MaintenanceTable.MaintenanceID, MaintenanceID),
  });

   if (!maintenance) {
    return "No Maintenance found"; // or throw an error if you prefer
  }


  const CarByMaintenance = await db.query.CarTable.findFirst({
    where: eq(CarTable.CarID, maintenance.carID),
      with: {
        maintenance: true, // include maintenances if you want
      }
    })

  const CarByID = CarByMaintenance?.CarID
  ? await db.query.CarTable.findFirst({
      where: eq(CarTable.CarID, CarByMaintenance.CarID),
    })
  : null;

  return CarByID;
};



//update a car by id
export const updateCarService = async (CarID: number, carTable: Partial<TICar>) => {
    const [updated] = await db.update(CarTable)
        .set(carTable)
        .where(eq(CarTable.CarID, CarID))
        .returning();
    
    if (updated) {
        return "Car updated successfully ✅";
    }
    return "Car not updated"
}

// Delete Car By ID
export const deleteCarService = async (CarID: number) =>{
    const deletedCar = await db.delete(CarTable)
    .where(eq(CarTable.CarID, CarID))
    .returning();

    if(deletedCar.length >0){
        return "Car deleted Successfully!!"
    }

    return "Car deleting failed";
}

// Fetching maintenance for all cars
export const getAllCarsWithMaintenanceService = async () => {
     const carsWithMaintenance = await db.query.CarTable.findMany({
        with: {
            maintenance: true
        }
    })
    return carsWithMaintenance;
}

// Get cars with reservations
export const getAllCarsWithReservationsService = async () => {
    const customersWithReservations =  await db.query.CustomerTable.findMany({
        with: {
            reservations: true
        }
    })
    return customersWithReservations;
}