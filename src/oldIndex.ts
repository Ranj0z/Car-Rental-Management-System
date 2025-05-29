import db from "./Drizzle/db";
import { CustomerTable } from "./Drizzle/schemas";
import { eq } from "drizzle-orm";

// Function to get all customers from the database
const getAllCustomers = async () => {
    return await db.query.CustomerTable.findMany();
}

//Function to get a customer by ID
const getCustomerById = async (customerId: number) => {
    return await db.query.CustomerTable.findFirst({
        where: eq(CustomerTable.CustomerID, customerId),
    });
}

// Function to get customers with reservations
const getCustomersWithReservations = async (customerId: number) => {
    return await db.query.CustomerTable.findFirst({
        where: eq(CustomerTable.CustomerID, customerId), 
        with: {
            reservations: true,
        }
    })
};


async function main() {
    // Connect to the database
    // const customers = await getAllCustomers();
    // console.log("All Customers", customers);

    //fetch a customer by ID
    // const customer = await getCustomerById(5);
    // if (customer) {
    //     console.log("Customer with ID :", customer);
    // } else {
    //     console.log("Customer with ID  not found.");
    // }

    //fetch a customer with reservations
    // const customerWithReservations = await getCustomersWithReservations(3);
    // if (customerWithReservations) {
    //     console.log("Customer with Reservations:", customerWithReservations);
    // } else {
    //     console.log("Customer with Reservations not found.");
    // }
}

main().catch((error) => {
    console.error("Error in main function:", error);
    process.exit(1);
})