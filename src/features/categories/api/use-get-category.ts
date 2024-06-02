import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetCategory = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["Category", { id }],
        queryFn: async() => {
            const response = await client.api.categories[":id"].$get({
                param: ({ id })
            });

            if(!response.ok){
                console.log("error in getting Category: " + response.statusText)
                throw new Error(response.statusText + " - " + response.body);
            }

            const { data } = await response.json();
            console.log("data from query: ", data)
            return data;
        }
    })

    return query;
}