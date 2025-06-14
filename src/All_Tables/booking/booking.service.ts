import { eq } from "drizzle-orm";
import db from "../../Drizzle/db";
import { BookingTable, PaymentTable, TIBooking } from "../../Drizzle/schemas";


//Booking Table
//Create a new booking
export const createBookingService = async(newbooking :TIBooking) => {
    await db.insert(BookingTable).values(newbooking);

    return "Booking created successfully";
}

//Get All bookings from BookingTable
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

// Get bookings By PaymentID
export const getBookingByPaymentIDService = async (ID: number) => {
  const payment = await db.query.PaymentTable.findFirst({
    where: eq(PaymentTable.PaymentID, ID),
  });

   if (!payment) {
    return "No payments found"; // or throw an error if you prefer
  }

  const bookingByID = await db.query.BookingTable.findFirst({
    where: eq(BookingTable.BookingID, payment.BookingID),
    with: {
      payments: true, // include payments if you want
    }
  });

  return bookingByID;
};

// Fetching bookings for all cars
export const getAllCarsWithBookingsService = async () => {
     const carsWithBookings = await db.query.CarTable.findMany({
        with: {
            bookings: true
        }
    })
    return carsWithBookings;
}

// Fetching bookings with Payments
export const getAllBookingsWithPaymentsService = async () => {
     const BookingsWithPayments = await db.query.BookingTable.findMany({
        with: {
            payments: true
        }
    })
    return BookingsWithPayments;
}

//update a booking by id
export const updateBookingService = async (ID: number, bookingTable: Partial<TIBooking>) => {
    const [updated] = await db.update(BookingTable)
        .set(bookingTable)
        .where(eq(BookingTable.BookingID, ID))
        .returning();
    
    if (updated) {
        return "Booking updated successfully";
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