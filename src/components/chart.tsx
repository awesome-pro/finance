import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { AreaChart, BarChart3, FileSearch, LineChart } from 'lucide-react';
import AreaVariant from './area-variant';
import BarVariant from './bar-variant';
import LineVariant from './line-variant';

  
type Props = {
    data?: {
        date: string;
        income: number;
        expenses: number;
    }[];
}


function Chart(
    {
        data = []
    } : Props
) {

    const [chartType, setChartType] = React.useState('area')

    const onTypeChange = (type: string) => {
        //TODO: add paywall
        setChartType(type)
    }
  return (
    <Card className='border-none drop-shadow-sm flex flex-col items-center justify-center'>
        <CardHeader className='flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between'>
            <CardTitle className=' text-xl line-clamp-1'>
                Transactions
            </CardTitle>
            <Select
             defaultValue={chartType}
             onValueChange={onTypeChange}
            >
                <SelectTrigger className=' lg:w-auto h-9 rounded-md px-3'>
                    <SelectValue placeholder="Chart Type"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='area'>
                        <div className='flex items-center'>
                            <AreaChart className='size-6 mr-2 shrink-0'/>
                            <p className=' line-clamp-1'>
                                Area Chart
                            </p>
                        </div>
                    </SelectItem>
                    <SelectItem value='bar'>
                        <div className='flex items-center'>
                            <BarChart3 className='size-6 mr-2 shrink-0'/>
                            <p className=' line-clamp-1'>
                                Bar Chart
                            </p>
                        </div>
                    </SelectItem>
                    <SelectItem value='line'>
                        <div className='flex items-center'>
                            <LineChart className='size-6 mr-2 shrink-0'/>
                            <p className=' line-clamp-1'>
                                Line Chart
                            </p>
                        </div>
                    </SelectItem>
                </SelectContent>
            </Select>
        </CardHeader>
        <CardContent>
            {data.length === 0 ? (
                <div className='flex flex-col gap-y-4 items-center justify-center h-[350px] w-full'>
                    <FileSearch className='size-6 text-muted-foreground'/>
                    <p className=' text-muted-foreground text-sm'>
                        No Data for this period
                    </p>
                </div>
            ) : (
                <>
                    {chartType === 'area' && <AreaVariant data={data}/>}
                    {chartType === 'bar' && <BarVariant data={data}/>}
                    {chartType === 'line' && <LineVariant data={data}/>}
                </>     
            )}
        </CardContent>
    </Card>
  )
}

export default Chart