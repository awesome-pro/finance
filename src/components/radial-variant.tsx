import React from 'react'
import {
    Cell,
    Legend,
    RadialBar,
    RadialBarChart,
    ResponsiveContainer,
    Tooltip
} from "recharts"

import CustomToolTip from './custom-tooltip'

import { formatCurrency} from '@/lib/utils'
import CategoryToolTip from './category-tooltip'

const COLORS = ["#0062FF", "#FF647F", "#12C6FF", "#FF9354"]

type Props = {
    data?: {
        name: string;
        value: number;
    }[];
}

function RadialVariant(
    {
        data
    }: Props
) {
  return (
    <ResponsiveContainer width={400} height={350}>
        <RadialBarChart
         cx={"50%"}
         cy={"30%"}
         barSize={10}
         innerRadius={"90%"}
         outerRadius={"10%"}
         data={data?.map((item, index) => ({
            ...item,
            fill: COLORS[index % COLORS.length]
         }))}
        >
            <RadialBar
             label={{
                position: "insideStart",
                fill: "#fff",
                fontSize: "12px"
             }}
             background
             dataKey={"value"}
             strokeWidth={30}
            />
            <Legend 
             layout='horizontal'
             verticalAlign='bottom'
             align='right'
             iconType='circle'
             content={({ payload}: any) => {
                return (
                    <ul className='flex flex-col space-y-2'>
                        {payload.map((entry: any, index: number) => (
                            <li 
                             key={`item-${index}`}
                             className=' flex flex-row space-x-2 items-center justify-center'
                             >
                                <span
                                 className=' size-2 rounded-full'
                                 style={{ backgroundColor: entry.color }}
                                />
                                <div className=' space-x-1'>
                                    <span className='text-sm text-muted-foreground'>
                                        {entry.value}
                                    </span>
                                    <span className='text-sm'>
                                        {formatCurrency(entry.payload.value)}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )
             }}
            />
        </RadialBarChart>    
    </ResponsiveContainer>
  )
}

export default RadialVariant