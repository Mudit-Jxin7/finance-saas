import { z } from 'zod'
import { zValidator } from '@hono/zod-validator';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';

import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const runtime = 'edge';

const app = new Hono().basePath('/api')

app
    .get('/hello',
        clerkMiddleware(),
        (c) => {

            const auth = getAuth(c)

            if (!auth?.userId) {
                return c.json({
                    message: 'You are not authenticated',
                })
            }

            return c.json({
                message: 'Hello Next.js!',
                userId: auth.userId,
            })
        })


export const GET = handle(app)
export const POST = handle(app)