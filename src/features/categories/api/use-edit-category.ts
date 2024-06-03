import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api.categories[":id"]["$patch"]>['json']

export const useEditCategory = (id?: string) => {
    const queryClient = useQueryClient();


    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.categories[":id"]["$patch"]({
                json,
                param: { id }
            });
            if (!response.ok) {
                throw new Error(response.statusText + " - " + response.body);
            }
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Category edited successfully");
            console.log("query edited successfully ;)")
            queryClient.invalidateQueries({ queryKey: ["category", { id }] })
            queryClient.invalidateQueries({ queryKey: ["transactions"]})
            queryClient.invalidateQueries({ queryKey: ["categories"]}) // If categories impact accounts
        },
        onError: (error) => {
            toast.error(error.message + " - Failed to edit Category");
            console.log("error: " + error)
        }
    });

    return mutation;
};
