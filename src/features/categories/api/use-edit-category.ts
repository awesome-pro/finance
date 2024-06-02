import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api.categories[":id"]["$patch"]>['json']

export const useEditCategory = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async(json) => {
            const response = await client.api.categories[":id"]["$patch"](
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
            toast.success("Category edited successfully");
            console.log("Category edited successfully");
            queryClient.invalidateQueries({ queryKey: ["category", { id }]});
            queryClient.invalidateQueries({ queryKey: ["categories"]});
            //TODO: invalidate summary and transactions
        },
        onError: (error) => {
            toast.error(error.message + "Failed to edit Category");
            console.log("Failed to edit Category")
            console.error(error);
        }
    })

    return mutation;
}