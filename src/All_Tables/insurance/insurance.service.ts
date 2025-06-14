import { eq } from "drizzle-orm";
import db from "../../Drizzle/db";
import { CarTable, InsuranceTable, TIInsurance } from "../../Drizzle/schemas";

//CRUD
//Insurance Table
//Make a new Insurance
export const createInsuranceService = async (insurance: TIInsurance) => {
    await db.insert(InsuranceTable).values(insurance);

    return "Insurance added sucessfully";
}

//Get All Existing Insurances
export const getAllInsuranceService = async() =>{
    const allInsurances = await db.query.InsuranceTable.findMany();
    return allInsurances;
}

// Get insurance By InsuranceID
export const getInsuranceByIDService = async (ID: number) => {
  const insuranceByID = await db.query.InsuranceTable.findFirst({
    where: eq(InsuranceTable.InsuranceID, ID)
  });
  return insuranceByID;
};

//Update Insurance By ID
export const updateInsuranceByIDService = async (ID: number, updatedInsurance: Partial<TIInsurance>) =>{
    const [updated] = await db.update(InsuranceTable)
        .set(updatedInsurance)
        .where(eq(InsuranceTable.InsuranceID, ID))
        .returning();
    
    if (updated) {
        return "Insurance Updated successfully ✅"
    }
    return "Insurance Not updated"
}

//Get a Insurance by CarID
export const getInsuranceByCarIDService = async (ID: number) => {
  const insuranceByCarID = await db.query.InsuranceTable.findMany({
    where: eq(InsuranceTable.carID, ID)
  });
  return insuranceByCarID;
};

// Delete Insurance By ID
export const deleteInsuranceService = async (ID: number) =>{
    const deletedInsurance = await db.delete(InsuranceTable)
    .where(eq(InsuranceTable.InsuranceID, ID))
    .returning();

    if(deletedInsurance.length > 0){
        return "Insurance deleted Successfully!!"
    }

    return "Failed to delete Insurance!!";
}