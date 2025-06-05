import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { CustomerTable, TICustomer, TSCustomer } from "../Drizzle/schemas";

//CRUD
//Customer Table
//Create a new Customer
export const createCustomerService = async (customer: TICustomer) => {
    await db.insert(CustomerTable).values(customer);

    return "User created sucessfully";
}

//Get All Existing Customers
export const getAllCustomersService = async() =>{
    const allCustomers = await db.query.CustomerTable.findMany();
    return allCustomers;
}

// Get customer with reservations
export const getAllCustomersWithReservationsService = async () => {
    const customersWithReservations =  await db.query.CustomerTable.findMany({
        with: {
            reservations: true
        }
    })
    return customersWithReservations;
}

// Get customer By CustomerID
export const getCustomerByIDService = async (ID: number) => {
  const customerByID = await db.query.CustomerTable.findFirst({
    where: eq(CustomerTable.CustomerID, ID)
  });
  return customerByID;
};

//update a customer by id
export const updateCustomerService = async (ID: number, CustomerUpdated: Partial<TICustomer>) => {
    const [updated] = await db.update(CustomerTable)
        .set(CustomerUpdated)
        .where(eq(CustomerTable.CustomerID, ID))
        .returning();
    
    if (updated) {
        return "Customer updated successfully ✅";
    }
    return "Customer not updated!!"
}

// Delete Customer By ID
export const deleteCustomerService = async (ID: number) =>{
    const deletedCar = await db.delete(CustomerTable)
    .where(eq(CustomerTable.CustomerID, ID))
    .returning();

    if(deletedCar.length >0){
        return "Customer deleted Successfully!!"
    }

    return "Customer deleting failed";
}

// Get customer By specific user ID
// export const getCustomerByUserIDService = async (ID: number) => {
//   const customerByID = await db.query.CustomerTable.findMany({
//     where: eq(CustomerTable.CustomerID, ID)
//   });
//   return customerByID;
// };


