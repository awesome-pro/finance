import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { convertAmountFromMilliUnits } from "@/lib/utils";

export const useGetTransaction = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["Transaction", { id }],
        queryFn: async() => {
            const response = await client.api.transactions[":id"].$get({
                param: ({ id })
            });

            if(!response.ok){
                console.log("error in getting transaction: " + response.statusText)
                throw new Error(response.statusText + " - " + response.body);
            }

            const { data } = await response.json();
            console.log("data from query: ", data)
            return {
                ...data,
                amount: convertAmountFromMilliUnits(data.amount)
            }
        }
    })

    return query;
}