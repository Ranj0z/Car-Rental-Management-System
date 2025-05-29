import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schemas from "./schemas";

export const client = new Client({
    connectionString: process.env.DATABASE_URL as string,
});

const main = async () => {
    await client.connect();
}

main().then(() => {
    console.log("Connected to the database Successfully!");
}).catch((error) => {
    console.error("Error connecting to the database:", error);
});

export const db = drizzle(client, {
    schema: schemas,
    logger: true,
});

export default db;