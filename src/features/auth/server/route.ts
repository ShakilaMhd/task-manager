import { z } from "zod"

import { Hono } from "hono";
import { ID } from "node-appwrite";
import { zValidator } from "@hono/zod-validator"
import { loginSchema, registerSchema } from "../schemas";
import { createAdminClient } from "@/lib/appwrite";
import { deleteCookie, setCookie } from "hono/cookie"
import { AUTH_COOKIE } from "../constants";

const app = new Hono()
    .post("/login", zValidator("json", loginSchema), async (c) => {
        const { email, password } = c.req.valid("json")

        console.log({ email, password });
        // return c.json({ success: "ok" })
        // return c.json({ email, password })
        return c.json({ success: true })
    })

    .post("/register", zValidator("json", registerSchema), async (c) => {
        const { name, email, password } = c.req.valid("json")

        const { account } = await createAdminClient()

        const user = await account.create(
            ID.unique(),
            email,
            password,
            name
        )

        const session = await account.createEmailPasswordSession(
            email, password
        )

        setCookie(c, AUTH_COOKIE, session.secret, {
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 30
        })

        console.log({ name, email, password });
        // return c.json({ success: "ok" })
        // return c.json({ name, email, password })
        return c.json({ success: true })
        // return c.json({ data:user })
    })

    .post("/logout", (c) => {
        deleteCookie(c, AUTH_COOKIE)
        
        return c.json({ success: true })
    })
export default app