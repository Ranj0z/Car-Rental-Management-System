import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { BookingTable, TIBooking } from "../Drizzle/schemas";


//Car Table
//Create a new booking
export const createBookingService = async(newbooking :TIBooking) => {
    await db.insert(BookingTable).values(newbooking);

    return "Booking created successfully";
}

//Get All bookings from carTable
export const getAllBookingsService = async () =>{
    const allBookings = await db.query.BookingTable.findMany()
    return allBookings;
}


// Get booking By CarID
export const getBookingByCarIDService = async (ID: number) => {
  const bookingByID = await db.query.BookingTable.findFirst({
    where: eq(BookingTable.BookingID, ID)
  });
  return bookingByID;
};

// Get bookings By BookingID
export const getBookingByIDService = async (ID: number) => {
  const bookingByID = await db.query.BookingTable.findMany({
    where: eq(BookingTable.carID, ID)
  });
  return bookingByID;
};

// Get bookings By CustomerID
export const getBookingByCustomerIDService = async (ID: number) => {
  const bookingByID = await db.query.BookingTable.findMany({
    where: eq(BookingTable.customerID, ID)
  });
  return bookingByID;
};


//update a booking by id
export const updateBookingService = async (ID: number, bookingTable: Partial<TIBooking>) => {
    const [updated] = await db.update(BookingTable)
        .set(bookingTable)
        .where(eq(BookingTable.BookingID, ID))
        .returning();
    
    if (updated) {
        return "Booking updated successfully ✅";
    }
    return "Booking not updated"
}

// Delete Booking By ID
export const deleteBookingService = async (ID: number) =>{
    const deletedBooking = await db.delete(BookingTable)
    .where(eq(BookingTable.BookingID, ID))
    .returning();

    if(deletedBooking.length >0){
        return "Booking deleted Successfully!!"
    }

    return "Booking not deleted!!";
}