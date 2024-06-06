import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

export const useGetAccounts = () => {
    const query = useQuery({
        queryKey: ["accounts"],
        queryFn: async() => {
            const response = await client.api.accounts.$get();

            if(!response.ok){
                console.log("error in getting accounts: " + response.statusText)
                throw new Error(response.statusText + " - " + response.body);
            }

            const { data } = await response.json();
            console.log("data from query: ", data)
            toast.success("Accounts fetched successfully")
            return data;
        }
    })

    return query;
}