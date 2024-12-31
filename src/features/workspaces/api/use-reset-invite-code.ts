import { toast } from "sonner";

import { dataTagSymbol, useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc"


type ResponseType = InferResponseType<typeof client.api.workspaces[":workspaceId"]["reset-invite-code"]["$post"], 200>
type RequestType = InferRequestType<typeof client.api.workspaces[":workspaceId"]["reset-invite-code"]["$post"]>

export const useResetInviteCode = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ param }) => {
            const response = await client.api.workspaces[":workspaceId"]["reset-invite-code"]["$post"]({ param })


            if (!response.ok) {
                throw new Error("کد دعوت بازنشانی نشد😐 ")
            }

            return await response.json()
        },
        onSuccess: ({ data }) => {
            toast.success("کد دعوت بازنشانی شد")
            queryClient.invalidateQueries({ queryKey: ["workspaces"] })
            queryClient.invalidateQueries({ queryKey: ["workspaces", data.$id] })

        },
        onError: () => {
            toast.error("کد دعوت بازنشانی نشد😐")
        }
    })
    return mutation
}