import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc"
import { InferResponseType } from "hono";

interface UseGetWorkspaceAnalyticsProps {
    workspaceId: string
}

export type ProjectAnWorkspaceResponseType = InferResponseType<typeof client.api.workspaces[":workspaceId"]["analytics"]["$get"], 200>

export const useGetWorkspaceAnalytics = ({ workspaceId }: UseGetWorkspaceAnalyticsProps) => {
    const query = useQuery({
        queryKey: ["workspace-analytics", workspaceId],
        queryFn: async () => {
            const response = await client.api.workspaces[":workspaceId"]["analytics"].$get({ param: { workspaceId } })

            if (!response.ok) {
                throw new Error("آنالیز فضای کاری ها بارگزاری نشد")
            }

            const { data } = await response.json()

            return data
        }
    })
    return query
}