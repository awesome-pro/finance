import React from 'react'
import {
    Cell,
    Legend,
    Pie,
    PieChart,
    PieLabel,
    ResponsiveContainer,
    Tooltip
} from "recharts"

import CustomToolTip from './custom-tooltip'

import { formatPercentage } from '@/lib/utils'
import CategoryToolTip from './category-tooltip'

const COLORS = ["#0062FF", "#FF647F", "#12C6FF", "#FF9354"]

type Props = {
    data?: {
        name: string;
        value: number;
    }[];
}

function PieVariant(
    {
        data
    }: Props
) {
  return (
    <ResponsiveContainer width={450} height={350}>
        <PieChart>
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
                                        {formatPercentage(entry.payload.percent * 100)}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )
             }}
            />
            <Tooltip content={<CategoryToolTip/>}/>
            <Pie
             data={data}
             cx={'50%'}
             cy={"50%"}
             outerRadius={90}
             innerRadius={60}
             paddingAngle={2}
             dataKey={"value"}
             fill='#8884d8'
             labelLine={false}
            >
                {data?.map((_entry, index) => (
                    <Cell
                     key={`cell-${index}`}
                     fill={COLORS[index % COLORS.length]}
                    />
                ))}
            </Pie>
        </PieChart>
    </ResponsiveContainer>
  )
}

export default PieVariant