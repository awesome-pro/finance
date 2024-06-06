import { format } from 'date-fns';
import React from 'react'
import {
    Tooltip,
    XAxis,
    ResponsiveContainer,
    CartesianGrid,
    Line,
    LineChart
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

function LineVariant(
    {
        data
    }: Props
) {
  return (
    <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
            <CartesianGrid strokeDasharray={'3 3'}/>
            <XAxis
             axisLine={true}
             tickLine={true}
             dataKey={"date"}
             tickFormatter={(value) => format(value, "dd MMM")}
             style={{ fontSize: "12px"}}
             tickMargin={16}
            />
            <Tooltip content={<CustomToolTip/>}/>

            <Line
             dot={false}
             dataKey={'income'}
             stroke='#3b83fe'
             strokeWidth={2}   
             className='drop-shadow-sm'
            />
            <Line
             dataKey={'expenses'}
             stroke='#f43f5e'
             strokeWidth={2}
             className='drop-shadow-sm'
             dot={false}
            />
        </LineChart>
    </ResponsiveContainer>
  )
}

export default LineVariant