import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";


export const useGetTransactions = () => {
    const params = useSearchParams();

    const from = params.get("from") || ""
    const to = params.get("to") || ""
    const accountId = params.get("accountId") || ""

    const query = useQuery({
        queryKey: ["Transactions", { from , to , accountId }],
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
                toast.error("Error in getting transactions")
                throw new Error(response.statusText + " - " + response.body);
            }

            const { data } = await response.json();
            
            console.log( data)
            toast.success("Transactions fetched successfully")
            return data;
        }
    })

    return query;
}