import React, {useState, useRef, useEffect} from 'react';
import {useTheme} from '@material-ui/core/styles';
import {Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ReferenceArea, Brush} from 'recharts';

const data = [
    {Timestamp: '0', uv: 4000, pv: 9000},
    {Timestamp: '1', uv: 3000, pv: 7222},
    {Timestamp: '2', uv: 2000, pv: 6222},
    {Timestamp: '3', uv: 1223, pv: 5400},
    {Timestamp: '4', uv: 1890, pv: 3200},
    {Timestamp: '5', uv: 2390, pv: 2500},
    {Timestamp: '6', uv: 3490, pv: 1209},
];
const series = [
    {
        name: 'Series 1', data: [
            {category: 1, value: Math.random()},
            {category: 2, value: Math.random()},
            {category: 3, value: Math.random()}
        ]
    },
    {
        name: 'Series 2', data: [
            {category: 1, value: Math.random()},
            {category: 2, value: Math.random()},
            {category: 3, value: Math.random()}
        ]
    },
    {
        name: 'Series 3', data: [
            {category: 1, value: Math.random()},
            {category: 2, value: Math.random()},
            {category: 3, value: Math.random()},
            {category: 4, value: Math.random()}
        ]
    },
];
export default class Chart extends React.Component {
    render() {
        return (
            <div>
                <LineChart width={600} height={300} syncId="anyId">
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="category" type='number'/>
                    <YAxis dataKey="value"/>
                    <Tooltip/>
                    <Legend/>
                    <Brush/>
                    {series.map(s => (
                        <Line dataKey="value" data={s.data} name={s.name} key={s.name}/>
                    ))}
                </LineChart>

                <LineChart width={600} height={200} data={data} syncId="anyId"
                           margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="Timestamp"/>
                    <YAxis/>
                    <Tooltip/>
                    <Line type='monotone' dataKey='pv' stroke='#82ca9d' fill='#82ca9d'/>
                    <Line type='monotone' dataKey='uv' stroke='#8884d8' fill='#8884d8'/>
                    <Brush/>
                </LineChart>
            </div>
        );
    }
}