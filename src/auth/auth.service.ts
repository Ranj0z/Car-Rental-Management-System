//Database interaction

import db from "../Drizzle/db";
import { CustomerTable, TICustomer } from "../Drizzle/schemas";
import { sql } from "drizzle-orm";

export const authService = async (customer: TICustomer) => {
    await db.insert(CustomerTable).values(customer);

    return "User created sucessfully";
}

//login a customer
export const customerLoginService = async (customer : TICustomer) =>{
    //email and phone number
    const { email } = customer;

    return await db.query.CustomerTable.findFirst({
        columns:  { 
            firstName: true, 
            lastName: true, 
            email: true, 
            phoneNumber: true, 
            address: true,
            password: true,
            role: true,
        }, where: sql`${CustomerTable.email} = ${email}`
    })
}