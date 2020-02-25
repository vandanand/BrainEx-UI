import React, {useState, useEffect} from 'react';
import {useTheme} from '@material-ui/core/styles';
import {LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Brush, Tooltip} from 'recharts';

export default function CurSeqChartViz(props) {
    const [plotData, setPlotData] = useState([
        {}
    ]);

    useEffect(() => {
        if (props.data.length !== 0) {
            setPlotData(props.data);
        }
    });
    const theme = useTheme();
    return (

        <div>
            {/*<React.Fragment>*/}
            {/*     <ResponsiveContainer  height="80%">*/}
            <LineChart
                width={350} height={250}
                data={plotData} syncId="anyId"
                margin={{top: 10, right: 10, left: 0, bottom: 10}}>
                <XAxis tick={false}
                    dataKey="sequence_length"
                />
                <YAxis/>
                {/*<Tooltip/>*/}
                <Line type='monotone' dataKey='query_seq' dot={false}
                      stroke={theme.palette.primary.main} fill={theme.palette.primary.main}/>
                <Brush/>
            </LineChart>
            {/*</ResponsiveContainer>*/}
            {/*</React.Fragment>*/}
        </div>
    );
}
