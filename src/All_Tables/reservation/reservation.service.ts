import { eq } from "drizzle-orm";
import db from "../../Drizzle/db";
import { ReservationTable, TIReservation } from "../../Drizzle/schemas";


//Car Table
//Create a new reservation
export const createReservationService = async(newreservation :TIReservation) => {
    await db.insert(ReservationTable).values(newreservation);

    return "Reservation created successfully";
}

//Get All reservation from carTable
export const getAllReservationsService = async () =>{
    const allReservations = await db.query.ReservationTable.findMany()
    return allReservations;
}


// Get reservation By ReservationID
export const getReservationByReservationIDService = async (ID: number) => {
  const reservationByID = await db.query.ReservationTable.findFirst({
    where: eq(ReservationTable.ReservationID, ID)
  });
  return reservationByID;
};

// Get reservation By CarID
export const getReservationByCarIDService = async (ID: number) => {
  const reservationByCarID = await db.query.ReservationTable.findMany({
    where: eq(ReservationTable.carID, ID)
  });
  return reservationByCarID;
};

// Get reservation By CustomerID
export const getReservationByCustomerIDService = async (ID: number) => {
  const reservationByID = await db.query.ReservationTable.findMany({
    where: eq(ReservationTable.customerID, ID)
  });
  return reservationByID;
};


//update a reservation by id
export const updateReservationService = async (ID: number, reservationTable: Partial<TIReservation>) => {
    const [updated] = await db.update(ReservationTable)
        .set(reservationTable)
        .where(eq(ReservationTable.ReservationID, ID))
        .returning();
    
    if (updated) {
        return "Reservation updated successfully ✅";
    }
    return "Reservation not updated"
}

// Delete Reservation By ID
export const deleteReservationService = async (ID: number) =>{
    const deletedReservation = await db.delete(ReservationTable)
    .where(eq(ReservationTable.ReservationID, ID))
    .returning();

    if(deletedReservation.length >0){
        return "Reservation deleted Successfully!!"
    }

    return "Reservation not deleted!!";
}