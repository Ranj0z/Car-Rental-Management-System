//Database interaction

import db from "../Drizzle/db";
import { CustomerTable, TICustomer } from "../Drizzle/schemas";

export const createCustomerService = async (customer: TICustomer) => {
    await db.insert(CustomerTable).values(customer);

    return "User created sucessfully";
}
