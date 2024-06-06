import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

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
            toast.success("Categories fetched successfully")
            return data;
        }
    })

    return query;
}