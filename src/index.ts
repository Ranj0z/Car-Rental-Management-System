import express from "express";
import customer from "./customer/customer.routes";
import carRoutes from "./car/car.route";

const app = express();

app.use(express.json());

customer(app);
carRoutes(app);

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
