import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.categories.$post>;
type RequestType = InferRequestType<typeof client.api.categories.$post>['json']

export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async(json) => {
            const response = await client.api.categories.$post({
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
            toast.success("Category created successfully");
            console.log("Category created successfully");
            queryClient.invalidateQueries({ queryKey: ["Categories"]})
        },
        onError: (error) => {
            toast.error(error.message + "Failed to create Category");
            console.log("Failed to create Category")
            console.error(error);
        }
    })

    return mutation;
}