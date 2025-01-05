import { toast } from "sonner";

import { dataTagSymbol, useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc"


type ResponseType = InferResponseType<typeof client.api.workspaces[":workspaceId"]["join"]["$post"], 200>
type RequestType = InferRequestType<typeof client.api.workspaces[":workspaceId"]["join"]["$post"]>

export const useJoinWorkspace = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ param, json }) => {
            const response = await client.api.workspaces[":workspaceId"]["join"]["$post"]({ param, json })


            if (!response.ok) {
                throw new Error("دعوت به فضای کاری انجام نشد😐 ")
            }

            return await response.json()
        },
        onSuccess: ({ data }) => {
            toast.success("به فضای کاری پیوست")
            queryClient.invalidateQueries({ queryKey: ["workspaces"] })
            queryClient.invalidateQueries({ queryKey: ["workspaces", data.$id] })

        },
        onError: () => {
            toast.error("دعوت به فضای کاری انجام نشد😐")
        }
    })
    return mutation
}