import "server-only"

import {
    Account,
    Client,
    Databases,
    Models,
    Storage,
    type Account as AccountType,
    type Databases as DatabasesType,
    type Storage as StorageType,
    type Users as UsersType
} from "node-appwrite"

import { getCookie } from "hono/cookie"
import { createMiddleware } from "hono/factory"

import { AUTH_COOKIE } from "@/features/auth/constants"

//create type this middlaware will return
type AdditionalContext = {
    Variables: {
        account: AccountType
        databases: DatabasesType
        storage: StorageType
        users: UsersType
        user: Models.User<Models.Preferences>
    }
}

export const sessionMiddlware = createMiddleware<AdditionalContext>(
    async (c, next) => {
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)

        //obtain the cookie read that cookie in this middlware
        const session = getCookie(c, AUTH_COOKIE)

        if (!session) {
            return c.json({ error: "Unauthorized" }, 401)
        }

        client.setSession(session)
        //SDKs
        const account = new Account(client)
        const databases = new Databases(client)
        const storage = new Storage(client)

        //result from account.get method this is an fetch request
        const user = await account.get()

        c.set("account", account)
        c.set("databases", databases)
        c.set("storage", storage)
        c.set("user", user)

        await next()
    }
)