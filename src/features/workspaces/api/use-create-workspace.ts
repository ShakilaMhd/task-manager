import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc"


type ResponseType = InferResponseType<typeof client.api.workspaces["$post"]>
type RequestType = InferRequestType<typeof client.api.workspaces["$post"]>

export const useCreateWorkspace = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ form }) => {
            const response = await client.api.workspaces["$post"]({ form })


            if (!response.ok) {
                throw new Error("فضای کاری ساخته نشد😐 ")
            }

            return await response.json()
        },
        onSuccess: () => {
            toast.success("فضای کاری ساخته شد🙂")
            queryClient.invalidateQueries({ queryKey: ["workspaces"] })

        },
        onError: () => {
            toast.error("فضای کاری ساخته نشد😐")
        }
    })
    return mutation
}