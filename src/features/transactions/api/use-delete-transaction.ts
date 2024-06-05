import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.transactions[":id"]["$delete"]>;

export const useDeleteTransaction = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async() => {
            const response = await client.api.transactions[":id"]["$delete"](
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
            toast.success("Transaction deleted successfully");
            console.log("Transaction deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["transaction", { id }]});
            queryClient.invalidateQueries({ queryKey: ["transactions"]});
            queryClient.invalidateQueries({ queryKey: ["summary"]});
        },
        onError: () => {
            toast.error("Failed to delete transaction");
            console.log("Failed to delete transaction")
            //console.error(error);
        }
    })

    return mutation;
}