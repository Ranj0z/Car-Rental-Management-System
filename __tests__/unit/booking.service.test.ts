import { createBookingService, deleteBookingService, getAllBookingsService, getBookingByIDService, updateBookingService } from  "../../src/All_Tables/booking/booking.service";
import db from "../../src/Drizzle/db";
import { BookingTable } from "../../src/Drizzle/schemas";


jest.mock("../../src/Drizzle/db", () => ({
  insert: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  select: jest.fn(),
  query: {
    BookingTable: {
      findFirst: jest.fn(),
      findMany: jest.fn()
    }
  }
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Booking Service", () => {
  describe("createBookingService", () => {
    it("should create a booking and return success message", async () => {
      const booking = {
        carID: 1,
        customerID: 1,
        rentalStartDate: new Date().toISOString(),
        rentalEndDate: new Date().toISOString(),
        totalAmount: "500.00"
      };

      (db.insert as jest.Mock).mockReturnValue({
        values: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValueOnce([booking])
        })
      });

      const result = await createBookingService(booking);
      expect(db.insert).toHaveBeenCalledWith(BookingTable);
      expect(result).toEqual(booking);
    });
  });

  describe("getAllBookingsService", () => {
    const bookings =  [
      {
          BookingID: 1,
          customerID: 1,
          carID: 1,
          rentalStartDate:
           "2024-06-05",
          rentalEndDate: "2024-06-10",
          totalAmount: "250.00"
      },
      {
          BookingID: 2,
          customerID: 2,
          carID: 2,
          rentalStartDate: "2024-06-06",
          rentalEndDate: "2024-06-11",
          totalAmount: "275.00"
      },
      {
          BookingID: 3,
          customerID: 3,
          carID: 3,
          rentalStartDate: "2024-06-07",
          rentalEndDate: "2024-06-12",
          totalAmount: "300.00"
      },
      {
          BookingID: 4,
          customerID: 4,
          carID: 4,
          rentalStartDate: "2024-06-08",
          rentalEndDate: "2024-06-13",
          totalAmount: "325.00"
      },
      {
          BookingID: 5,
          customerID: 5,
          carID: 5,
          rentalStartDate: "2024-06-09",
          rentalEndDate: "2024-06-14",
          totalAmount: "350.00"
      }
    ];
    it("should return all bookings", async () => {
      (db.query.BookingTable.findMany as jest.Mock).
      mockResolvedValueOnce(bookings);

      const result = await getAllBookingsService();
      expect(result).toEqual(bookings);
    });
  });

  describe("getBookingByIdService", () => {
    it("should return a booking by ID", async () => {
      const booking = {
        bookingID: 1,
        carID: 1,
        customerID: 1,
        rentalStartDate: new Date().toISOString(),
        rentalEndDate: new Date().toISOString(),
        totalAmount: "250.00"
      };

      (db.query.BookingTable.findFirst as jest.Mock).mockResolvedValueOnce(booking);

      const result = await getBookingByIDService(1);
      expect(result).toEqual(booking);
    });
  });

  describe("updateBookingService", () => {
    it("should update a booking and return success message", async () => {
      const updated = {
        carID: 2,
        customerID: 2,
        rentalStartDate: new Date().toISOString(),
        rentalEndDate: new Date().toISOString(),
        totalAmount: "550.00"
      };

      (db.update as jest.Mock).mockReturnValue({
        set: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            returning: jest.fn().mockResolvedValueOnce([updated])
          })
        })
      });

      const result = await updateBookingService(1, updated);
      expect(db.update).toHaveBeenCalledWith(BookingTable);
      expect(result).toBe("Booking updated successfully");
    });
  });

  describe("deleteBookingService", () => {
    it("should delete a booking and return it", async () => {
      const deleted = {
        bookingID: 1,
        carID: 1,
        customerID: 1,
        rentalStartDate: new Date().toISOString(),
        rentalEndDate: new Date().toISOString(),
        totalAmount: "250.00"
      };

      (db.delete as jest.Mock).mockReturnValue({
        where: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValueOnce([deleted])
        })
      });

      const result = await deleteBookingService(1);
      expect(db.delete).toHaveBeenCalledWith(BookingTable);
      expect(result).toEqual(deleted);
    });
  })
});