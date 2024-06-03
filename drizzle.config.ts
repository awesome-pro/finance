import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { defineConfig } from "drizzle-kit";


config({ path: ".env.local" });

export default defineConfig({
    schema: './src/db/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    verbose: true,
    strict: true,
    out: './migrations',
    migrations: {
        table: "migrations",
        schema: "public"
    } 
})