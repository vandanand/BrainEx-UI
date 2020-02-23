import React from 'react';
import {useTheme} from '@material-ui/core/styles';
import {LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer} from 'recharts';
import Title from './Title';

// Generate data
function createData(seqLength, chanVal) {
    return {seqLength, chanVal};
}

const data = [
    createData('0', 0.362),
    createData('1', -0.2),
    createData('2', 1.9),
    createData('3', 3.06),
    createData('4', -0.13),
    createData('5', -.029),
    createData('6', -.03),
    createData('7', 0.93),
    createData('8', 1.87),
];

export default function TabledSeqThnl() {
    const theme = useTheme();

    return (
        <React.Fragment>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                    }}
                >
                    {/*<XAxis dataKey="seqLength" tick={false} stroke={theme.palette.text.secondary}/>*/}
                    {/*<YAxis stroke={theme.palette.text.secondary} tick={false}>*/}
                    {/*    /!*<Label*!/*/}
                    {/*    /!*    angle={270}*!/*/}
                    {/*    /!*    position="left"*!/*/}
                    {/*    /!*    style={{textAnchor: 'middle', fill: theme.palette.text.primary}}*!/*/}
                    {/*    /!*>*!/*/}
                    {/*    /!*    Sales ($)*!/*/}
                    {/*    /!*</Label>*!/*/}
                    {/*</YAxis>*/}
                    <Line type="monotone" dataKey="chanVal" stroke={theme.palette.primary.main} dot={false}/>
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}
