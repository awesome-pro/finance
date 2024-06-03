import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { useSearchParams } from "next/navigation";

export const useGetTransactions = () => {
    const params = useSearchParams();

    const from = params.get("from") || ""
    const to = params.get("to") || ""
    const accountId = params.get("accountId") || ""

    const query = useQuery({
        // ToDO: check if the params are needed in key
        queryKey: ["transactions", { from , to , accountId }],
        queryFn: async() => {
            const response = await client.api.transactions.$get({
                query: {
                    from,
                    to,
                    accountId
                }
            });

            if(!response.ok){
                console.log("error in getting transactions: " + response.statusText)
                throw new Error(response.statusText + " - " + response.body);
            }

            const { data } = await response.json();
            console.log("data from query: ", data)
            return data;
        }
    })

    return query;
}