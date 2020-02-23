import React from 'react';
import {useTheme} from '@material-ui/core/styles';
import {LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Brush, Tooltip} from 'recharts';
import Title from './Title';

const data = [
    {
        "seqLength": "0",
        "chanVal": 0.1,

    },
    {
        "seqLength": "1",
        "chanVal": 0.5,

    },
    {
        "seqLength": "2",
        "chanVal": 2.3,

    },
    {
        "seqLength": "3",
        "chanVal": 3.8,
    }
];

export default function ReChart() {
    const theme = useTheme();
    return (
        <div>
            {/*<React.Fragment>*/}
            {/*     <ResponsiveContainer  height="80%">*/}
            <LineChart
                width={350} height={250}
                data={data} syncId="anyId"
                margin={{top: 10, right: 10, left: 0, bottom: 10}}>
                <XAxis tick={false}
                    // dataKey="seqLength"
                />
                    <YAxis/>
                {/*<Tooltip/>*/}
                <Line type='monotone' dataKey='chanVal'
                          stroke={theme.palette.primary.main} fill={theme.palette.primary.main}/>
                    <Brush/>
                </LineChart>
            {/*</ResponsiveContainer>*/}
            {/*</React.Fragment>*/}
        </div>
    );
}
