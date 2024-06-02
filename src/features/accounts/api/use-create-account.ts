import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { json } from "stream/consumers";

type ResponseType = InferResponseType<typeof client.api.accounts.$post>;
type RequestType = InferRequestType<typeof client.api.accounts.$post>['json']

export const useCreateAccount = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async(json) => {
            const response = await client.api.accounts.$post({
                json
            });

            if(!response.ok){
                throw new Error(response.statusText + " - " + response.body);
            }
           
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Account created successfully");
            queryClient.invalidateQueries({ queryKey: ["accounts"]});
        },
        onError: (error) => {
            toast.error(error.message + "Failed to create account");
            console.error(error);
        }
    })

    return mutation;
}