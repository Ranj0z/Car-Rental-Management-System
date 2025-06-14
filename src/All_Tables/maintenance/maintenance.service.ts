import { eq } from "drizzle-orm";
import db from "../../Drizzle/db";
import { CarTable, MaintenanceTable, TIMaintenance } from "../../Drizzle/schemas";

//CRUD
//Maintenance Table
//Make a new Maintenance
export const createNewMaintenanceService = async (maintenance: TIMaintenance) => {
    await db.insert(MaintenanceTable).values(maintenance);

    return "Maintenance made sucessfully";
}

//Get All Existing Maintenance
export const getAllMaintenanceService = async() =>{
    const allMaintenance = await db.query.MaintenanceTable.findMany();
    return allMaintenance;
}

// Get maintenance ByID
export const getMaintenanceByIDService = async (ID: number) => {
  const MaintenanceByID = await db.query.MaintenanceTable.findFirst({
    where: eq(MaintenanceTable.MaintenanceID, ID)
  });
  return MaintenanceByID;
};


//Get a maintenance by CarID
export const getMaintenanceByCarIDService = async (CarID: number) => {
  const car = await db.query.CarTable.findFirst({
    where: eq(CarTable.CarID, CarID),
  });

   if (!car) {
    return "No Car found"; // or throw an error if you prefer
  }


  const MaintenanceByCarID = await db.query.MaintenanceTable.findFirst({
    where: eq(MaintenanceTable.MaintenanceID, car.CarID),
      with: {
        car: true, // include maintenances if you want
      }
    })

  const maintenanceByCarID = MaintenanceByCarID?.MaintenanceID
  ? await db.query.MaintenanceTable.findFirst({
      where: eq(MaintenanceTable.MaintenanceID, MaintenanceByCarID.MaintenanceID),
    })
  : null;

  return maintenanceByCarID;
};

//update a maintenance by id
export const updateMaintenanceService = async (ID: number, maintenanceTable: Partial<TIMaintenance>) => {
    const [updated] = await db.update(MaintenanceTable)
        .set(maintenanceTable)
        .where(eq(MaintenanceTable.MaintenanceID, ID))
        .returning();
    
    if (updated) {
        return "Maintenance updated successfully ✅";
    }
    return "Maintenance not updated"
}

// Delete Maintenance By ID
export const deleteMaintenanceService = async (ID: number) =>{
    const deletedMaintenance = await db.delete(MaintenanceTable)
    .where(eq(MaintenanceTable.MaintenanceID, ID))
    .returning();

    if(deletedMaintenance.length >0){
        return "Maintenance deleted Successfully!!"
    }

    return "Failed to delete Maintenance!!";
}