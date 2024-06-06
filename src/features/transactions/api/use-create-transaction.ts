import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.transactions.$post>;
type RequestType = InferRequestType<typeof client.api.transactions.$post>['json']

export const useCreateTransaction = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async(json) => {
            const response = await client.api.transactions.$post({
                json
            });
            console.log("response in mutation: ", response)

            if(!response.ok){
                console.log("response.statusText: ", response.statusText)
                throw new Error(response.statusText + " - " + response.body);
            }

            console.log("response in mutation success: ", response)
           
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Transaction created successfully");
            console.log("Transaction created successfully");
            queryClient.invalidateQueries({ queryKey: ["Transactions"]});
            queryClient.invalidateQueries({ queryKey: ["summary"]});
        },
        onError: (error) => {
            toast.error(error.message + "Failed to create Transaction");
            console.log("Failed to create Transaction")
            console.error(error);
        }
    })

    return mutation;
}