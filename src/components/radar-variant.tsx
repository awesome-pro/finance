import { Tooltip } from '@radix-ui/react-tooltip';
import React from 'react'
import {
    PolarAngleAxis,

    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
    ResponsiveContainer
} from "recharts"

type Props = {
    data?: {
        name: string;
        value: number;
    }[];
}

function RadarVariant(
    {
        data
    }: Props
) {
  return (
    <ResponsiveContainer width={600} height={350}>
        <RadarChart
         cx={"50%"}
         cy={"50%"}
         outerRadius="60%"
         data={data}
        >
            <PolarGrid/>
            <PolarAngleAxis style={{ fontSize: "12px"}} dataKey="name"/>
            <PolarRadiusAxis style={{ fontSize: "12px"}} />
            <Radar dataKey="value" stroke='#3b32f6' fill='#3b82f6' fillOpacity={0.6}/>
        </RadarChart>
    </ResponsiveContainer>
  )
}

export default RadarVariant