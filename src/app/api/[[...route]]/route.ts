import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import authers from './authers'
import books from './books'

export const runtime = 'edge';

const app = new Hono().basePath('/api')

app.route('/authers', authers);
app.route('/books', books);

// app.get(
//     '/hello',
//     clerkMiddleware(),
//     (c) => {
//         console.log("Request received for /hello");
//         const auth = getAuth(c)
//         console.log("Auth: ", auth)
//         if (!auth?.userId) {
//             console.log("Authentication failed");
//             return c.json({
//                 error: "You are not authenticated",
//             })
//         }

//         console.log("Authentication successful");
//         return c.json({
//             message: 'Hello Next.js!',
//             userId: auth.userId,
//             sessionId: auth.sessionId,
//         })
//     }
// )




export const GET = handle(app)
export const POST = handle(app) 