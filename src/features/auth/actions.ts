"use server"

import { cookies } from "next/headers"
import { Account, Client } from "node-appwrite"
import { AUTH_COOKIE } from "./constants"

export const getCurrent = async () => {
    try {
        const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
        
        
        const session = await cookies().get(AUTH_COOKIE)
        // console.log(session);
        if (!session) return null
        
        const account = new Account(client)

        // console.log(account);

        // console.log(account.get());
        return await account.get()

        // console.log("getcurrent ok");
    } catch {
        return null
    }
}