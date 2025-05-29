import "dotenv/config";
import {migrate} from "drizzle-orm/node-postgres/migrator";

import { db, client } from "./db";

async function migration() {
    console.log("........Starting migration.......................");
    await migrate(db, {
        migrationsFolder: __dirname + "/migrations"
    }),
    await client.end();
    console.log(".........Migration completed successfully!.......");
    process.exit(0);

}

migration().catch((error) => {
    console.error("Migration failed:", error);
    process.exit(1);
});