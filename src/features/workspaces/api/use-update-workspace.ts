import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc"

type ResponseType = InferResponseType<typeof client.api.workspaces[":workspaceId"]["$patch"], 200>
type RequestType = InferRequestType<typeof client.api.workspaces[":workspaceId"]["$patch"]>

export const useUpdateWorkspace = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ form, param }) => {
            const response = await client.api.workspaces[":workspaceId"]["$patch"]({ form, param })


            if (!response.ok) {
                throw new Error("آپدیت فضای کاری انجام نشد😐 ")
            }

            return await response.json()
        },
        onSuccess: ({data}) => {
            toast.success("فضای کاری آپدیت شد")

            queryClient.invalidateQueries({ queryKey: ["workspaces"] })
            queryClient.invalidateQueries({ queryKey: ["workspaces", data.$id] })

        },
        onError: () => {
            toast.error("فضای کاری ساخته نشد😐")
        }
    })
    return mutation
}