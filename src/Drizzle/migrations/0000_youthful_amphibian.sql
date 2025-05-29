CREATE TABLE "booking" (
	"BookingID" serial PRIMARY KEY NOT NULL,
	"customer_id" integer NOT NULL,
	"car_id" integer NOT NULL,
	"booking_date" date NOT NULL,
	"return_date" date NOT NULL,
	"total_amount" numeric(10, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "car" (
	"CarID" serial PRIMARY KEY NOT NULL,
	"model" varchar(50) NOT NULL,
	"year" date NOT NULL,
	"color" varchar(20) NOT NULL,
	"rental_rate" numeric(10, 2) NOT NULL,
	"availability" varchar(10) NOT NULL,
	"location" integer
);
--> statement-breakpoint
CREATE TABLE "customer" (
	"CustomerID" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"email" varchar(100) NOT NULL,
	"phone_number" text NOT NULL,
	"address" varchar(255) NOT NULL,
	CONSTRAINT "customer_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "insurance" (
	"InsuranceID" serial PRIMARY KEY NOT NULL,
	"car_id" integer NOT NULL,
	"insurance_provider" varchar(100) NOT NULL,
	"policy_number" varchar(50) NOT NULL,
	"coverage_start_date" date NOT NULL,
	"coverage_end_date" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE "location" (
	"LocationID" serial PRIMARY KEY NOT NULL,
	"location_name" varchar(100) NOT NULL,
	"address" varchar(255) NOT NULL,
	"contact_number" text
);
--> statement-breakpoint
CREATE TABLE "maintenance" (
	"MaintenanceID" serial PRIMARY KEY NOT NULL,
	"car_id" integer NOT NULL,
	"maintenance_date" date NOT NULL,
	"description" text NOT NULL,
	"cost" numeric(10, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payment" (
	"PaymentID" serial PRIMARY KEY NOT NULL,
	"customer_id" integer NOT NULL,
	"payment_date" date NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"payment_method" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reservation" (
	"ReservationID" serial PRIMARY KEY NOT NULL,
	"customer_id" integer NOT NULL,
	"car_id" integer,
	"reservation_date" date NOT NULL,
	"return_date" date NOT NULL,
	"total_amount" numeric(10, 2) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "booking" ADD CONSTRAINT "booking_customer_id_customer_CustomerID_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customer"("CustomerID") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking" ADD CONSTRAINT "booking_car_id_car_CarID_fk" FOREIGN KEY ("car_id") REFERENCES "public"."car"("CarID") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "car" ADD CONSTRAINT "car_location_location_LocationID_fk" FOREIGN KEY ("location") REFERENCES "public"."location"("LocationID") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "insurance" ADD CONSTRAINT "insurance_car_id_car_CarID_fk" FOREIGN KEY ("car_id") REFERENCES "public"."car"("CarID") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "maintenance" ADD CONSTRAINT "maintenance_car_id_car_CarID_fk" FOREIGN KEY ("car_id") REFERENCES "public"."car"("CarID") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment" ADD CONSTRAINT "payment_customer_id_customer_CustomerID_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customer"("CustomerID") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_customer_id_customer_CustomerID_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customer"("CustomerID") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_car_id_car_CarID_fk" FOREIGN KEY ("car_id") REFERENCES "public"."car"("CarID") ON DELETE cascade ON UPDATE no action;