import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.categories["bulk-delete"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.categories["bulk-delete"]["$post"]>['json']

export const useBulkDeleteCategories = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async(json) => {
            const response = await client.api.categories["bulk-delete"]["$post"]({
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
            toast.success("Categories deleted successfully");
            console.log("Categories deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["categories"]});
            queryClient.invalidateQueries({ queryKey: ["summary"]})
        },
        onError: (error) => {
            toast.error(error.message + "Failed to create Categories");
            console.log("Failed to delete Categories")
            console.error(error);
        }
    })

    return mutation;
}