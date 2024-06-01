import { Hono } from "hono";
import { db } from "../../../../db/drizzle";
import { accounts, insertAccountsSchema } from "../../../../db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2"

const app = new Hono()
    .get(
        "/", 
        clerkMiddleware(),
        async (c) => {
            const auth = getAuth(c);
            console.log("auth: ", auth);

            if(!auth?.userId || !auth){              
               return   c.json({
                            error: "Unauthorized"
                        }, 401)          
            }

            const data = await db.select({
                id:accounts.id,
                name:accounts.name
            }).from(accounts)
            .where(eq(accounts.userId, auth.userId));

            console.log("data: ", data);

            return c.json(
                {   
                    data
                }
        );
    })
    .post(
        "/",
        clerkMiddleware(),
        zValidator("json", insertAccountsSchema.pick({
            name: true
        })),
        async (c) => {
            const auth = getAuth(c);
            console.log("auth: ", auth);
            const values = c.req.valid("json");
            console.log("values: ", values);

            if (!auth?.userId || !auth) {
                return c.json({
                    error: "Unauthorized"
                }, 401)
            }

            const [data] = await db.insert(accounts).values({
                id: createId(),
                userId: auth.userId,
                name: values.name,
                plaidId: '' // Add the missing property here
            }).returning()

            console.log("data: ", data);

            return c.json(
                {   
                    data
                }
            );
        }
        );

export default app;