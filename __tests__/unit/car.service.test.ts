import {
  createCarService,
  // getCarService,
  // getCarByIdService,
  updateCarService,
  deleteCarService,
  // getCarWithBookingsService
} from "../../src/All_Tables/car/car.service";
import db from "../../src/Drizzle/db";
// import db from "../../../src/drizzle/db";
import { CarTable } from "../../src/Drizzle/schemas";

// mock modules
jest.mock("../../../src/drizzle/db", () => ({
  insert: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  select: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Car Service", () => {
  describe("createCarService", () => {
    it("should insert a car and return success message", async () => {
      const newcar = {
        CarModel: "Toyota Corolla",
        year: new Date().toISOString(),
        color: "Blue",
        rentalRate: "50.00",
        availability:"true",
        location: 1
      };
      const inserted = { carID: 1, ...newcar };

      (db.insert as jest.Mock).mockReturnValue({
        values: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValueOnce([inserted])
        })
      });

      const result = await createCarService(newcar);
      expect(db.insert).toHaveBeenCalledWith(CarTable);
      expect(result).toBe("Car added successfully");
    });


  })
})