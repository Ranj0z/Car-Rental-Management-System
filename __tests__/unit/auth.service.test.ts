import { Result } from "pg";
import { registerNewUser } from "../../src/All_Tables/customer/customer.service"
import db from "../../src/Drizzle/db";
import { CustomerTable, TICustomer, TSCustomer } from "../../src/Drizzle/schemas";

jest.mock("../../../src/drizzle/db", () => ({
  insert: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  query: {
    CustomerTable: {
      findFirst: jest.fn(),
      findMany: jest.fn()
    }
  }
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Customer Service", () => {
  describe("createCustomerService", () => {
    it("should insert a customer and return success message", async () => {
      const customer: TICustomer = { // explicitly tell TypeScript that your customer object conforms to the TICustomer type. This will enforce the correct type for role at the point of creation.
                firstName: "Erica",
                lastName: "Nyaikamba",
                email: "erikapanda@gmail.com",
                password: "pass123",
                phoneNumber: "0700267677", 
                address: "Nairobi CBD",
                role: "user"
            };

      (db.insert as jest.Mock).mockReturnValue({ values: jest.fn().mockResolvedValueOnce([{}]) });

      const result = await registerNewUser(customer);
      expect(db.insert).toHaveBeenCalledWith(CustomerTable);
      expect(result).toBe("Customer added successfully");
    });
  });

});