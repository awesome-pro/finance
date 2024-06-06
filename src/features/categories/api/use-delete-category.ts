import { toast } from "sonner";
import {  InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$delete"]>;

export const useDeleteCategory = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async() => {
            const response = await client.api.categories[":id"]["$delete"](
                {
                    param: { id }
                }
            )
            console.log("response in mutation: ", response)

            if(!response.ok){
                console.log("response.statusText: ", response.statusText)
                throw new Error(response.statusText + " - " + response.body);
            }

            console.log("response in mutation success: ", response)
           
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Category deleted successfully");
            console.log("Category deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["Category", { id }]});
            queryClient.invalidateQueries({ queryKey: ["Categories"]});
            queryClient.invalidateQueries({ queryKey: ["Transactions"]});
            //TODO: invalidate summary and transactions
        },
        onError: () => {
            toast.error("Failed to delete Category");
            console.log("Failed to delete Category")
            //console.error(error);
        }
    })

    return mutation;
}