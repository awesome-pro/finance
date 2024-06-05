import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api.accounts[":id"]["$patch"]>['json']

export const useEditAccount = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async(json) => {
            const response = await client.api.accounts[":id"]["$patch"](
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
            toast.success("Account edited successfully");
            console.log("Account edited successfully");
            queryClient.invalidateQueries({ queryKey: ["account", { id }]});
            queryClient.invalidateQueries({ queryKey: ["accounts"]});
            queryClient.invalidateQueries({ queryKey: ["transactions"]})
            queryClient.invalidateQueries({ queryKey: ["categories"]})
            queryClient.invalidateQueries({ queryKey: ["summary"]})
        },
        onError: (error) => {
            toast.error(error.message + "Failed to edit account");
            console.log("Failed to edit account")
            console.error(error);
        }
    })

    return mutation;
}