import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";

import React from 'react'

type Props = {
    id: string;
    category?: string | null | undefined;
    categoryId?: string | null | undefined;
}


function CategoryColumn(
    {
        id,
        category,
        categoryId
    }: Props
) {
    const { onOpen: onOpenCategory } = useOpenCategory();

    const onClick = () => {
        {
            categoryId && onOpenCategory(categoryId);
        }
        //console.log(categoryId)
    }

  return (
    <div 
     className={cn(
        "flex items-center cursor-pointer hover:underline",
        !category && "text-rose-500"
     )}
     onClick={onClick}
    >
        {!category && <TriangleAlert className="mr-2 size-4 shrink-0"/>}
        {category || "Uncategorised"}
    </div>
  )
}

export default CategoryColumn