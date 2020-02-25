import React, {useState} from 'react';
import {useTheme} from '@material-ui/core/styles';
import {LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer} from 'recharts';
import Title from './Title';

export default function TabledSeqThnl() {

    function arrayToJSON(array) {
        let JSONarray = [];
        for (let i = 0; i<array.length;i++) {
            JSONarray.push({"seqLength": i.toString(), "chanVal": array[i]})
        }
        console.log("JSONarray");
        console.log(JSONarray);
        return JSONarray;
    }

    const [seqData, setSeqData] = useState(arrayToJSON([0.1, -0.2, 3.06]));
    const theme = useTheme();

    return (
        <React.Fragment>
            <ResponsiveContainer>
                <LineChart
                    data={seqData}
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
