import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import ImportTable from './import-table';
import { ArrowRightToLine, ChevronRight } from 'lucide-react';
import { index } from 'drizzle-orm/mysql-core';
import { convertAmountToMilliUnits } from '@/lib/utils';
import { format, parse } from 'date-fns';

const dateFormat = "yyyy-MM-dd HH:mm:ss"
const outputFormat = "yyyy-MM-dd";

const requiredOptions = [
    "amount",
    "date",
    "payee"
]

interface SelectedColumnState {
    [key: string]: string | null;
}
type Props = {
    data: string[][];
    onCancel: () => void
    onSubmit: (data: any) => void;
}
function ImportCard(
    {
        data,
        onCancel,
        onSubmit
    }: Props
) {
    const [selectedColumns, setSelectedColumns] = useState<SelectedColumnState>({})

    const headers = data[0];
    const body = data.slice(1);

    const onTableHeadSelectChange = (
        columnIndex: number,
        value: string | null
    ) => {
        setSelectedColumns((prev) => {
            const newSelectedColumns = {...prev};
            for( const key in newSelectedColumns){
                if(newSelectedColumns[key] === value){
                    newSelectedColumns[key] = null
                }
            }

            if(value === "skip"){
                value = null;
            }

            newSelectedColumns[`column_${columnIndex}`] = value;
            return newSelectedColumns;
        })
    }

    const progress = Object.values(selectedColumns).filter(Boolean).length;

    const handleContinue = () => {
        const getColumnIndex = (column: string) => {
            return column.split("_")[1];
        }

        const mappedData = {
            headers: headers.map((_header, index) => {
                const columnIndex = getColumnIndex(`column_${index}`);
                return selectedColumns[`column_${columnIndex}`] || null;
            }),
            body: body.map((row) => {
                const transformedRow = row.map((cell, index) => {
                    const columnIndex = getColumnIndex(`column_${index}`);
                    return selectedColumns[`column_${columnIndex}`] ? cell : null
                })

                return transformedRow.every((item) => item === null)
                ? []
                : transformedRow
            }).filter((row) => row.length > 0)
        };

        console.log({ mappedData })

        const arrayOfData = mappedData.body.map((row) => {
            return row.reduce((acc: any, cell, index) => {
                const header = mappedData.headers[index];
                if(header != null){
                    acc[header] = cell;
                }
                return acc;
            }, {})
        })

        console.log({ arrayOfData });

        const formattedData = arrayOfData.map((item) => ({
            ...item,
            amount: convertAmountToMilliUnits(parseFloat(item.amount)),
            date: format(parse(item.date, dateFormat, new Date()), outputFormat)
        }))

        console.log({ formattedData });

        onSubmit(formattedData);
    }

  return (
    <div className='max-w-screen-2xl lg:mx-32 mx-3 pb-10 -mt-24'>
        <Card className='border-none drop-shadow-sm'>
            <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
                <CardTitle className='text-xl line-clamp-1'>
                    Import Transaction
                </CardTitle>
                <div className='flex gap-4 flex-col lg:flex-row items-center lg:justify-center justify-start'>
                  <Button 
                   className=' w-full lg:w-32 border-rose-600 text-rose-600' 
                   size={'sm'}
                   onClick={onCancel}
                   variant={'outline'}
                  >
                      Cancel
                  </Button>
                  <Button
                    disabled={ progress < requiredOptions.length}
                    onClick={handleContinue}
                    size={'sm'}
                    className='w-full'
                  >
                    Continue ({progress} / {requiredOptions.length})
                    {
                        (progress >= requiredOptions.length) && <ChevronRight/>
                    }
                  </Button>
               </div>
            </CardHeader>
            <CardContent>
                <ImportTable
                 headers={headers}
                 body={body}
                 selectedColumns={selectedColumns}
                 onTableHeadSelectChange={onTableHeadSelectChange}
                />
            </CardContent>
        </Card>
    </div>
  )
}

export default ImportCard