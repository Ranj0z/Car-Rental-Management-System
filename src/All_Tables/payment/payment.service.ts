import { eq } from "drizzle-orm";
import db from "../../Drizzle/db";
import { CarTable, PaymentTable, TIPayment } from "../../Drizzle/schemas";

//CRUD
//Payment Table
//Make a new Payment
export const makePaymentService = async (payment: TIPayment) => {
    await db.insert(PaymentTable).values(payment);

    return "Payment made sucessfully";
}

//Get All Existing Payments
export const getAllPaymentsService = async() =>{
    const allPayments = await db.query.PaymentTable.findMany();
    return allPayments;
}

// Get payment By PaymentID
export const getPaymentByIDService = async (ID: number) => {
  const paymentByID = await db.query.PaymentTable.findFirst({
    where: eq(PaymentTable.PaymentID, ID)
  });
  return paymentByID;
};

// Delete Payment By ID
export const deletePaymentService = async (ID: number) =>{
    const deletedPayment = await db.delete(PaymentTable)
    .where(eq(PaymentTable.PaymentID, ID))
    .returning();

    if(deletedPayment.length >0){
        return "Payment deleted Successfully!!"
    }

    return "Failed to delete Payment!!";
}