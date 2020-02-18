import React from 'react';
import {useTheme} from '@material-ui/core/styles';
import {Label, Line, LineChart, ResponsiveContainer, XAxis, YAxis} from 'recharts';
import Title from './Title';
import ChartData from "./ChartData";

export default function Chart() {
    const theme = useTheme();

    return (
        <React.Fragment>
            <Title>Query Result</Title>
            <ResponsiveContainer>
                {/*    <LineChart*/}
                {/*        data={data}*/}
                {/*        margin={{*/}
                {/*            top: 16,*/}
                {/*            right: 16,*/}
                {/*            bottom: 0,*/}
                {/*            left: 50,*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        <XAxis dataKey="time" stroke={theme.palette.text.secondary}/>*/}
                {/*        <YAxis stroke={theme.palette.text.secondary}>*/}
                {/*            <Label*/}
                {/*                angle={270}*/}
                {/*                position="left"*/}
                {/*                style={{textAnchor: 'middle', fill: theme.palette.text.primary}}*/}
                {/*            >*/}
                {/*                Oxylevel*/}
                {/*            </Label>*/}
                {/*        </YAxis>*/}
                {/*<Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />*/}
                <ChartData/>
            </ResponsiveContainer>
    </React.Fragment>
  );
}
