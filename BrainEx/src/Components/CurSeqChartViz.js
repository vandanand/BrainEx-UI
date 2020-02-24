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
                    // dataKey="sequence_length"
                />
                <YAxis/>
                {/*<Tooltip/>*/}
                <Line type='monotone' dataKey='query_seq'
                      stroke={theme.palette.primary.main} fill={theme.palette.primary.main}/>
                <Brush/>
            </LineChart>
            {/*</ResponsiveContainer>*/}
            {/*</React.Fragment>*/}
        </div>
    );
}

// import React, {Component} from 'react';
// import {scaleBand, scaleLinear} from 'd3-scale';
// import XYAxis from './chartComponents/Xy_axis';
// import Line from './chartComponents/Line';
// import {curveMonotoneX, line} from 'd3-shape';
// import {extent} from 'd3-array';
// import {transition} from 'd3-transition';
//
// class CurSeqChartViz extends Component {
//     constructor() {
//         super();
//         this.state = {
//             data: [
//                 {sequence_length: 0, value: -0.5},
//                 {sequence_length: 1, value: 1.3},
//                 {sequence_length: 2, value: -2.6},
//                 {sequence_length: 3, value: 1.11},
//                 {sequence_length: 4, value: 0.36},
//                 {sequence_length: 5, value: -3.2},
//                 {sequence_length: 6, value: 0.008},
//                 {sequence_length: 7, value: -0.179},
//                 {sequence_length: 8, value: 2.36},
//                 {sequence_length: 9, value: -0.0017},
//                 {sequence_length: 10, value: -3.02},
//                 {sequence_length: 11, value: 1.594},
//             ],
//         }
//     }
//
//     UpdateData = (e) => {
//         e.preventDefault();
//         this.setState((prevState) => {
//             const data = prevState.data.map(d => ({
//                 sequence_length: d.sequence_length,
//                 value: Math.floor((Math.random() * 100) + 1)
//             }))
//             return {
//                 data
//             }
//         })
//     }
//
//     render() {
//         const {data} = this.state;
//         const parentWidth = 350;
//
//         const margins = {
//             top: 20,
//             right: 20,
//             bottom: 20,
//             left: 20,
//         };
//
//         const width = parentWidth - margins.left - margins.right;
//         const height = 200 - margins.top - margins.bottom;
//
//         const ticks = 5;
//         const t = transition().duration(1000);
//
//         const xScale = scaleBand()
//             .domain(data.map(d => d.sequence_length))
//             .rangeRound([0, width]).padding(0.1);
//
//         const yScale = scaleLinear()
//             .domain(extent(data, d => d.value))
//             .range([height, 0])
//             .nice();
//
//         const lineGenerator = line()
//             .x(d => xScale(d.sequence_length))
//             .y(d => yScale(d.value))
//             .curve(curveMonotoneX);
//
//         return (
//             <div>
//                 <button onClick={this.UpdateData}>Update data</button>
//                 <svg
//                     className="lineChartSvg"
//                     width={width + margins.left + margins.right}
//                     height={height + margins.top + margins.bottom}
//                 >
//                     <g transform={`translate(${margins.left}, ${margins.top})`}>
//                         <XYAxis {...{xScale, yScale, height, ticks, t}} />
//                         <Line data={data} xScale={xScale} yScale={yScale} lineGenerator={lineGenerator} width={width}
//                               height={height}/>
//                     </g>
//                 </svg>
//             </div>
//         );
//     }
// }
//
// export default CurSeqChartViz;

