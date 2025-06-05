import express from "express";

import customerRoutes from "./customer/customer.routes";
import carRoutes from "./car/car.route";
import bookingRoutes from "./booking/booking.route";
import paymentRoutes from "./payment/payment.routes";
import authRoutes from "./auth/auth.routes";

const app = express();

app.use(express.json());

customerRoutes(app);
carRoutes(app);
bookingRoutes(app);
paymentRoutes(app);
authRoutes(app);

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

