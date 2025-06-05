ALTER TABLE "payment" RENAME COLUMN "customer_id" TO "booking_id";--> statement-breakpoint
ALTER TABLE "payment" DROP CONSTRAINT "payment_customer_id_customer_CustomerID_fk";
--> statement-breakpoint
ALTER TABLE "payment" ADD CONSTRAINT "payment_booking_id_booking_BookingID_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."booking"("BookingID") ON DELETE cascade ON UPDATE no action;