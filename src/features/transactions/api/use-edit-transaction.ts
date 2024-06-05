import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.transactions[":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api.transactions[":id"]["$patch"]>['json']

export const useEditTransaction = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async(json) => {
            const response = await client.api.transactions[":id"]["$patch"](
                {
                    json,
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
            toast.success("transaction edited successfully");
            console.log("transaction edited successfully");
            queryClient.invalidateQueries({ queryKey: ["transaction", { id }]});
            queryClient.invalidateQueries({ queryKey: ["transactions"]});
            queryClient.invalidateQueries({ queryKey: ["summary"]});
            //TODO: invalidate summary 
        },
        onError: (error) => {
            toast.error(error.message + "Failed to edit transaction");
            console.log("Failed to edit transaction")
            console.error(error);
        }
    })

    return mutation;
}