import express from "express";

import customerRoutes from "./All_Tables/customer/customer.routes";
import carRoutes from "./All_Tables/car/car.route";
import bookingRoutes from "./All_Tables/booking/booking.route";
import maintenanceRoutes from "./All_Tables/maintenance/maintenance.routes";
import paymentRoutes from "./All_Tables/payment/payment.routes";
import reservationRoutes from "./All_Tables/reservation/reservation.route";
import locationRoutes from "./All_Tables/location/location.route";
import insuranceRoutes from "./All_Tables/insurance/insurance.route";

const app = express();

app.use(express.json());

customerRoutes(app);
carRoutes(app);
bookingRoutes(app);
paymentRoutes(app);
maintenanceRoutes(app);
reservationRoutes(app);
locationRoutes(app);
insuranceRoutes(app);

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

