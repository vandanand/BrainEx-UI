import React from 'react';
import {useTheme} from '@material-ui/core/styles';
import {LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Brush, Tooltip} from 'recharts';
import Title from './Title';


// Generate data
function createData(seqLength, chanVal) {
    return {seqLength, chanVal};
}

const data = [
    {
        "Timestamp": "0",
        "101-SART-June2018-AS_target correct_Channel-1 HbO_126468": 0.1,

    },
    {
        "Timestamp": "1",
        "101-SART-June2018-AS_target correct_Channel-1 HbO_126468": 0.5,

    },
    {
        "Timestamp": "2",
        "101-SART-June2018-AS_target correct_Channel-1 HbO_126468": 2.3,

    },
    {
        "Timestamp": "3",
        "101-SART-June2018-AS_target correct_Channel-1 HbO_126468": 3.8,
    }
];

export default function ReCharts() {
    const theme = useTheme();
    return (
        <React.Fragment>
            <ResponsiveContainer>
                <LineChart width={600} height={200} data={data} syncId="anyId"
                           margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                    <XAxis dataKey="Timestamp"/>
                    <YAxis/>
                    <Tooltip/>
                    <Line type='monotone' dataKey='101-SART-June2018-AS_target correct_Channel-1 HbO_126468'
                          stroke={theme.palette.primary.main} fill={theme.palette.primary.main}/>
                    <Brush/>
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}
