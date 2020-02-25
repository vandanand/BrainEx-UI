import React, {useState} from 'react';
import {useTheme} from '@material-ui/core/styles';
import {LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer} from 'recharts';
import Title from './Title';

export default function TabledSeqThnl() {
    const [seqData, setSeqData] = useState({
        data: [
            {
                "seqLength": "0",
                "chanVal": 0.362,

            },
            {
                "seqLength": "1",
                "chanVal": -0.2,

            },
            {
                "seqLength": "2",
                "chanVal": 1.9,

            },
            {
                "seqLength": "3",
                "chanVal": 3.06,
            },
            {
                "seqLength": "4",
                "chanVal": -0.13,
            },
            {
                "seqLength": "5",
                "chanVal": -.029,
            },
            {
                "seqLength": "6",
                "chanVal": -.03,
            },
            {
                "seqLength": "7",
                "chanVal": 0.93,
            },
            {
                "seqLength": "8",
                "chanVal": 1.87,
            }
        ]
    });
    const theme = useTheme();

    return (
        <React.Fragment>
            <ResponsiveContainer>
                <LineChart
                    data={seqData.data}
                    margin={{
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                    }}
                >
                    <Line type="monotone" dataKey="chanVal" stroke={theme.palette.primary.main} dot={false}/>
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}
