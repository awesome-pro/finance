"use client"

import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { useSearchParams } from "next/navigation";
import { convertAmountFromMilliUnits } from "@/lib/utils";

export const useGetSummary = () => {
    const params = useSearchParams();

    const from = params.get("from") || ""
    const to = params.get("to") || ""
    const accountId = params.get("accountId") || ""

    const query = useQuery({
        // ToDO: check if the params are needed in key
        queryKey: ["transactions", { from , to , accountId }],
        queryFn: async() => {
            const response = await client.api.summary.$get({
                query: {
                    from,
                    to,
                    accountId
                }
            });

            if(!response.ok){
                console.log("error in getting summar: " + response.statusText)
                throw new Error(response.statusText + " - " + response.body);
            }

            const { data } = await response.json();

            console.log("data from query: ", data)
            return {
                ...data,
                incomeAmount: convertAmountFromMilliUnits(data.incomeAmount),
                expenseAmount: convertAmountFromMilliUnits(data.expenseAmount),
                remainingAmount: convertAmountFromMilliUnits(data.remainingAmount),
                categories: data.categories.map((category) => ({
                    ...category,
                    value: convertAmountFromMilliUnits(category.value)
                })),
                days: data.days.map((day) => ({
                    ...day,
                    income: convertAmountFromMilliUnits(day.income),
                    expenses: convertAmountFromMilliUnits(day.expenses)
                }))
            }
        }
    })

    return query;
}