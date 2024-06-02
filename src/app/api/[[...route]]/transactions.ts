import { Hono } from "hono";
import { db } from "../../../db/drizzle";
import { transactions, insertTransactionsSchema } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { eq, and, inArray } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2"
import * as z from "zod"
import { parse, subDays} from "date-fns"

const app = new Hono()
    .get(
        "/", 
        zValidator("query", z.object({
            from: z.string().optional(),
            to:z.string().optional(),
            accountId: z.string().optional()
        })),
        clerkMiddleware(),
        async (c) => {
            const auth = getAuth(c);
            console.log("auth: ", auth);
            const { from, to, accountId} = c.req.valid("query")

            if(!auth?.userId || !auth){              
                return   c.json({
                             error: "Unauthorized"
                         }, 401)          
             }
            
            const defaultTo = new Date();
            const defaultFrom = subDays(defaultTo, 30);

            const startDate = from 
                    ? parse(from, "yyyy-MM-dd", new Date())
                    :  defaultFrom
            const toDate = from 
                    ? parse(to, "yyyy-MM-dd", new Date())
                    :  defaultTo



            const data = await db.select({
                id:transactions.id,
                name:transactions.name
            }).from(transactions)
            .where(eq(transactions.userId, auth.userId));

            console.log("data: ", data);

            return c.json(
                {   
                    data
                }
        );
    })
    .get(
        "/:id",
        clerkMiddleware(),
        zValidator("param", z.object({
            id: z.string().optional()
        })),
        async(c) => {
            const auth = getAuth(c);
            console.log('auth: ' + auth)
            const { id } = c.req.valid("param");

            if(!id){
                return c.json({
                    error: "Bad Request, Missing Id"
                }, 400
                )
            }

            if(!auth?.userId){
                return c.json({
                    error: "Unauthorised"
                }, 401
                )
            }

            const [data] = await db
                .select({
                    id: transactions.id,
                    name: transactions.name
                })
                .from(transactions)
                .where(
                    and(
                        eq(transactions.userId, auth.userId),
                        eq(transactions.id, id)
                    )
                )
            
                if(!data){
                    return c.json({
                        error: "Not Found"
                    }, 404)
                }

                return c.json(
                    { data }
                )
        }
    )
    .post(
        "/",
        clerkMiddleware(),
        zValidator("json", insertCategorySchema.pick({
            name: true
        })),
        async (c) => {
            console.log(" POST request received :)")
            console.log("c from post: ", c)
            const auth = getAuth(c);
            console.log("auth from post: ", auth);
            const values = c.req.valid("json");
            console.log("values from post: ", values);

            if (!auth?.userId || !auth) {
                return c.json({
                    error: "Unauthorized"
                }, 401)
            }

            const [data] = await db.insert(transactions).values({
                id: createId(),
                userId: auth.userId,
                ...values,
            }).returning()

            console.log("data due to post request: ", data);

            return c.json(
                {   
                    data
                }
            );
        }
    )
    .post(
        "/bulk-delete",
        clerkMiddleware(),
        zValidator(
            "json",
            z.object({
                ids: z.array(z.string())
            })
        ),
        async (c)=> {
            console.log("post method to delete")
            const auth = getAuth(c);
            console.log(" auth: ", auth)
            const values = c.req.valid("json");
            console.log("values in delete POST: ", values)

            if(!auth?.userId){
                console.log(" Unautorised: ", auth?.userId)
                return c.json(
                    {
                        "error": "Unauthorised!!"
                    },
                    401
                )
            }

            const data = await db
                .delete(transactions)
                .where(
                    and(
                        eq(transactions.userId, auth.userId),
                        inArray(transactions.id, values.ids)
                    )
                ).returning({
                    id: transactions.id
                })

                console.log("data: ", data)

                return c.json({
                    data
                })
        }
    )
    .patch(
        "/:id",
        clerkMiddleware(),
        zValidator(
            "param",
            z.object({
                id: z.string().optional()
            })
        ),
        zValidator(
            "json",
            insertCategorySchema.pick({
                name: true
            })
        ),
        async (c) => {
            const auth = getAuth(c);
            const  { id } = c.req.valid("param")
            const values = c.req.valid("json")

            console.log("id in patch: ", id)
            console.log("values in patch: ", values)

            if(!id){
                console.log("Missing id")
                return c.json({ error: "Missing ID"}, 400)
            }

            if(!auth?.userId){
                console.log("Unautorised")
                return c.json({ error: "Unauthorised"}, 401)
            }

            const [data] = await db
                .update(transactions)
                .set(values)
                .where(
                    and(
                        eq(transactions.userId, auth.userId),
                        eq(transactions.id, id)
                    )
                ).returning()

            if(!data){
                console.log("Not Found")
                return c.json({ error: "Account Not found :("}, 404)
            }

            return c.json({ data });
        }
    )
    .delete(
        "/:id",
        clerkMiddleware(),
        zValidator(
            "param",
            z.object({
                id: z.string().optional()
            })
        ),
        async (c) => {
            
            const auth = getAuth(c);
            const  { id } = c.req.valid("param")
           
            console.log("id in delete: ", id)

            if(!id){
                console.log("Missing id")
                return c.json({ error: "Missing ID"}, 400)
            }

            if(!auth?.userId){
                console.log("Unautorised")
                return c.json({ error: "Unauthorised"}, 401)
            }

            const [data] = await db
                .delete(transactions)
                .where(
                    and(
                        eq(transactions.userId, auth.userId),
                        eq(transactions.id, id)
                    )
                ).returning({
                    id: transactions.id
                });

            if(!data){
                console.log("Not Found")
                return c.json({ error: "Account Not found :("}, 404)
            }

            return c.json({ data });
        }
    )
    

export default app;