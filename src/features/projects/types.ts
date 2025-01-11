import { Models } from "node-appwrite";

//add some types to my document
export type Project = Models.Document & {
    name: string
    imageUrl: string
    workspaceId: string
}