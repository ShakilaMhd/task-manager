import { Models } from "node-appwrite";

//add some types to my document
export type Workspace = Models.Document & {
    name: string
    imageUrl: string
    inviteCode: string
    userId: string
}