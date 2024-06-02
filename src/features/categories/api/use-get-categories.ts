import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetCategories = () => {
    const query = useQuery({
        queryKey: ["Categories"],
        queryFn: async() => {
            const response = await client.api.categories.$get();

            if(!response.ok){
                console.log("error in getting Categories: " + response.statusText)
                throw new Error(response.statusText + " - " + response.body);
            }

            const { data } = await response.json();
            console.log("data from query: ", data)
            return data;
        }
    })

    return query;
}