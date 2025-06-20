import { db } from "./db";
import bcrypt from "bcryptjs";
import {
    CustomerTable,
    LocationTable,
    CarTable,
    ReservationTable,
    BookingTable,
    PaymentTable,
    MaintenanceTable,
    InsuranceTable
} from "./schemas";

// --- SEEDING LOGIC ---

async function seed() {
    console.log("Seeding started...");

    // Insert into location table
    await db.insert(LocationTable).values([
        { locationName: "Nairobi", address: "123 Nairobi", contactNumber: "1234567890" },
        { locationName: "Eldoret", address: "Eldoret", contactNumber: "0987654321" },
        { locationName: "Nakuru", address: "789 Nakuru", contactNumber: "5555555555" },
        { locationName: "Nyeri", address: "321 Nyeri", contactNumber: "2223334444" },
        { locationName: "Mombasa", address: "111 Mombasa", contactNumber: "6667778888" },
    ]);

    // Insert into customer table
    await db.insert(CustomerTable).values([
        { firstName: "John", lastName: "Doe", email: "john@example.com", phoneNumber: "555-1234", address: "1 Elm St", password: await bcrypt.hash("mypassword", 10)},
        { firstName: "Jane", lastName: "Smith", email: "jane@example.com", phoneNumber: "555-5678", address: "2 Maple Ave", password: await bcrypt.hash("mypassword0", 10) },
        { firstName: "Alice", lastName: "Johnson", email: "alice@example.com", phoneNumber: "555-8765", address: "3 Oak Dr", password: await bcrypt.hash("mypassword1", 10) },
        { firstName: "Bob", lastName: "Brown", email: "bob@example.com", phoneNumber: "555-4321", address: "4 Birch Ln", password: await bcrypt.hash("mypassword2", 10) },
        { firstName: "Charlie", lastName: "Miller", email: "charlie@example.com", phoneNumber: "5559999", address: "5 Cedar Rd", password: await bcrypt.hash("mypassword3", 10) },
    ]);

    // Insert into car table
    await db.insert(CarTable).values([
        { CarModel: "Toyota Corolla", year: "2020-01-01", color: "Red", rentalRate: "50.00", availability: "yes", location: 1 },
        { CarModel: "Honda Civic", year: "2019-06-01", color: "Blue", rentalRate: "55.00", availability: "yes", location: 2 },
        { CarModel: "Ford Focus", year: "2021-03-01", color: "Black", rentalRate: "60.00", availability: "yes", location: 3 },
        { CarModel: "Chevrolet Malibu", year: "2022-07-01", color: "White", rentalRate: "65.00", availability: "yes", location: 4 },
        { CarModel: "Nissan Altima", year: "2018-09-01", color: "Silver", rentalRate: "52.00", availability: "yes", location: 5 },
    ]);

    // Insert into reservation table
    await db.insert(ReservationTable).values([
        { customerID: 1, carID: 1, reservationDate: "2024-06-01", returnDate: "2024-06-10", totalAmount: "250.00" },
        { customerID: 2, carID: 2, reservationDate: "2024-06-02", returnDate: "2024-06-11", totalAmount: "275.00" },
        { customerID: 3, carID: 3, reservationDate: "2024-06-03", returnDate: "2024-06-12", totalAmount: "300.00" },
        { customerID: 4, carID: 4, reservationDate: "2024-06-04", returnDate: "2024-06-13", totalAmount: "325.00" },
        { customerID: 5, carID: 5, reservationDate: "2024-06-05", returnDate: "2024-06-14", totalAmount: "350.00" },
    ]);

    // Insert into booking table
    await db.insert(BookingTable).values([
        { customerID: 1, carID: 1, rentalStartDate: "2024-06-05", rentalEndDate: "2024-06-10", totalAmount: "250.00" },
        { customerID: 2, carID: 2, rentalStartDate: "2024-06-06", rentalEndDate: "2024-06-11", totalAmount: "275.00" },
        { customerID: 3, carID: 3, rentalStartDate: "2024-06-07", rentalEndDate: "2024-06-12", totalAmount: "300.00" },
        { customerID: 4, carID: 4, rentalStartDate: "2024-06-08", rentalEndDate: "2024-06-13", totalAmount: "325.00" },
        { customerID: 5, carID: 5, rentalStartDate: "2024-06-09", rentalEndDate: "2024-06-14", totalAmount: "350.00" },
    ]);

    // Insert into payment table
    await db.insert(PaymentTable).values([
        { BookingID: 1, paymentDate: "2024-06-05", amount: "250.00", paymentMethod: "Credit Card" },
        { BookingID: 2, paymentDate: "2024-06-06", amount: "275.00", paymentMethod: "Debit Card" },
        { BookingID: 3, paymentDate: "2024-06-07", amount: "300.00", paymentMethod: "Cash" },
        { BookingID: 4, paymentDate: "2024-06-08", amount: "325.00", paymentMethod: "Credit Card" },
        { BookingID: 5, paymentDate: "2024-06-09", amount: "350.00", paymentMethod: "Debit Card" },
    ]);

    // Insert into maintenance table
    await db.insert(MaintenanceTable).values([
        { carID: 1, maintenanceDate: "2024-06-01", description: "Oil change and tire rotation", cost: "50.00" },
        { carID: 2, maintenanceDate: "2024-06-02", description: "Brake inspection and fluid top-up", cost: "60.00" },
        { carID: 3, maintenanceDate: "2024-06-03", description: "Engine check and battery replacement", cost: "70.00" },
        { carID: 4, maintenanceDate: "2024-06-04", description: "Transmission service and filter change", cost: "80.00" },
        { carID: 5, maintenanceDate: "2024-06-05", description: "Alignment and suspension check", cost: "90.00" },
    ]);

    // Insert into insurance table
    await db.insert(InsuranceTable).values([
        { carID: 1, insuranceProvider: "ABC Insurance", policyNumber: "12345", startDate: "2024-01-01", endDate: "2024-12-31" },
        { carID: 2, insuranceProvider: "XYZ Insurance", policyNumber: "54321", startDate: "2024-02-01", endDate: "2025-01-31" },
        { carID: 3, insuranceProvider: "Delta Insurance", policyNumber: "67890", startDate: "2024-03-01", endDate: "2025-02-28" },
        { carID: 4, insuranceProvider: "SafeDrive", policyNumber: "98765", startDate: "2024-04-01", endDate: "2025-03-31" },
        { carID: 5, insuranceProvider: "ShieldCover", policyNumber: "11111", startDate: "2024-05-01", endDate: "2025-04-30" },
    ]);

    console.log("Seeding finished!");
    process.exit(0);
}

seed().catch((error) => {
    console.error("Error during seeding:", error);
    process.exit(1);
});