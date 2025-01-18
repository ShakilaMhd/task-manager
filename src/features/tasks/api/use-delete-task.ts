import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc"



type ResponseType = InferResponseType<typeof client.api.tasks[":taskId"]["$delete"], 200>
type RequestType = InferRequestType<typeof client.api.tasks[":taskId"]["$delete"]>

export const useDeleteTask = () => {

    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ param }) => {
            const response = await client.api.tasks[":taskId"]["$delete"]({ param })


            if (!response.ok) {
                throw new Error("تسک حذف نشد😐 ")
            }

            return await response.json()
        },
        onSuccess: ({data}) => {
            toast.success("تسک حذف شد🙂")


            queryClient.invalidateQueries({ queryKey: ["tasks"] })
            queryClient.invalidateQueries({ queryKey: ["task", data.$id] })

        },
        onError: () => {
            toast.error("تسک حذف نشد😐")
        }
    })
    return mutation
}