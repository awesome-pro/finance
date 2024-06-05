import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.transactions["bulk-delete"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.transactions["bulk-delete"]["$post"]>['json']

export const useBulkDeleteTransactions = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async(json) => {
            const response = await client.api.transactions["bulk-delete"]["$post"]({
                json
            })
            console.log("response in mutation: ", response)

            if(!response.ok){
                console.log("response.statusText: ", response.statusText)
                throw new Error(response.statusText + " - " + response.body);
            }

            console.log("response in mutation success: ", response)
           
            return await response.json();
        },
        onSuccess: () => {
            toast.success("transaction deleted successfully");
            console.log("transaction deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["transactions"]});
            queryClient.invalidateQueries({ queryKey: ["summary"]});
        },
        onError: (error) => {
            toast.error(error.message + "Failed to create transaction");
            console.log("Failed to delete transaction")
            console.error(error);
        }
    })

    return mutation;
}