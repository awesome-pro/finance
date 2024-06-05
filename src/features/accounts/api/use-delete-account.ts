import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$delete"]>;

export const useDeleteAccount = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async() => {
            const response = await client.api.accounts[":id"]["$delete"](
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
            toast.success("Account deleted successfully");
            console.log("Account deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["account", { id }]});
            queryClient.invalidateQueries({ queryKey: ["accounts"]});
            queryClient.invalidateQueries({ queryKey: ["summary"]})
        },
        onError: () => {
            toast.error("Failed to delete account");
            console.log("Failed to delete account")
            //console.error(error);
        }
    })

    return mutation;
}