import { format } from 'date-fns';
import React from 'react'
import {
    Tooltip,
    XAxis,
    ResponsiveContainer,
    CartesianGrid,
    BarChart,
    Bar
} from "recharts"
import CustomToolTip from './custom-tooltip';
import { useGetSummary } from '@/features/summary/use-get-summary';

type Props = {
    data?: {
        date: string;
        income: number;
        expenses: number;
    }[];
}

function BarVariant(
    {
        data
    }: Props
) {

  return (
    <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
            <CartesianGrid strokeDasharray={'3 3'}/>
            <XAxis
             axisLine={false}
             tickLine={false}
             dataKey={"date"}
             tickFormatter={(value) => format(value, "dd MMM")}
             style={{ fontSize: "12px"}}
             tickMargin={16}
            />
            <Tooltip content={<CustomToolTip/>}/>

            <Bar
             dataKey={'income'}
             fill='#3b83fe'
             className='drop-shadow-sm'
            />
            <Bar
             dataKey={'expenses'}
             fill='#f43f5e'
             className='drop-shadow-sm'

            />
        </BarChart>
    </ResponsiveContainer>
  )
}

export default BarVariant