import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc"
import { useRouter } from "next/navigation";


type ResponseType = InferResponseType<typeof client.api.tasks["bulk-update"]["$post"], 200>
type RequestType = InferRequestType<typeof client.api.tasks["bulk-update"]["$post"]>

export const useBulkUpdateTasks = () => {

    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json }) => {
            const response = await client.api.tasks["bulk-update"]["$post"]({ json })


            if (!response.ok) {
                throw new Error("تسک آپدیت نشد😐 ")
            }

            return await response.json()
        },
        onSuccess: () => {
            toast.success("تسک ها آپدیت شد🙂")

            queryClient.invalidateQueries({ queryKey: ["tasks"] })
  

        },
        onError: () => {
            toast.error("تسک هاآپدیت نشد😐")
        }
    })
    return mutation
}