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
import {FileSearch, LoaderPinwheel, PieChart, Radar, Radio, Target } from 'lucide-react';
import AreaVariant from './area-variant';
import BarVariant from './bar-variant';
import LineVariant from './line-variant';
import PieVariant from './pie-variant';
import RadarVariant from './radar-variant';
import RadialVariant from './radial-variant';
import { Skeleton } from './ui/skeleton';

  
type Props = {
    data?: {
        name: string;
        value: number;
    }[];
}


function SpendingPie(
    {
        data = []
    } : Props
) {

    const [chartType, setChartType] = React.useState('pie')

    const onTypeChange = (type: string) => {
        //TODO: add paywall
        setChartType(type)
    }
  return (
    <Card className='border-none drop-shadow-sm flex flex-col items-center justify-center'>
        <CardHeader className='flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between'>
            <CardTitle className=' text-xl line-clamp-1 mr-5'>
                Categories
            </CardTitle>
            <Select
             defaultValue={chartType}
             onValueChange={onTypeChange}
            >
                <SelectTrigger className=' lg:w-auto h-9 rounded-md px-3'>
                    <SelectValue placeholder="Chart Type"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='pie'>
                        <div className='flex items-center'>
                            <PieChart className='size-6 mr-2 shrink-0'/>
                            <p className=' line-clamp-1'>
                               Pie Chart
                            </p>
                        </div>
                    </SelectItem>
                    <SelectItem value='radar'>
                        <div className='flex items-center'>
                            <Radar className='size-6 mr-2 shrink-0'/>
                            <p className=' line-clamp-1'>
                               Radar Chart
                            </p>
                        </div>
                    </SelectItem>
                    <SelectItem value='radial'>
                        <div className='flex items-center'>
                            <Target className='size-6 mr-2 shrink-0'/>
                            <p className=' line-clamp-1'>
                                Radial Chart
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
                    {chartType === 'pie' && <PieVariant data={data}/>}
                    {chartType === 'radar' && <RadarVariant data={data}/>}
                    {chartType === 'radial' && <RadialVariant data={data}/>} 
                </>     
            )}
        </CardContent>
    </Card>
  )
}

export default SpendingPie

export const SpendingPieLoading = () => {
    return(
        <Card className='border-none drop-shadow-sm flex flex-col items-center justify-center'>
            <CardHeader className='flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between gap-8'>
                <Skeleton className='h-7 w-28'/>
                <Skeleton className='h-7 w-full lg:w-[80px]'/>
            </CardHeader>
            <CardContent className='flex flex-col gap-y-4 items-center justify-center h-[350px] w-full'>   
                    <Skeleton className='w-3/4 lg:w-[500px] h-[200px] lg:h-[300px]'/>
            </CardContent>
        </Card>
    )
}