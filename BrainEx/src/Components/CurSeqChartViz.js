import React, {Component} from 'react';
import {scaleBand, scaleLinear} from 'd3-scale';
import XYAxis from './chartComponents/Xy_axis';
import Line from './chartComponents/Line';
import {curveMonotoneX, line} from 'd3-shape';
import {extent} from 'd3-array';
import {transition} from 'd3-transition';
import * as d3 from "d3";


// const useStyles = makeStyles(theme => ({
//     root: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         margin: theme.spacing(1)
//     },
//     highlight: {
//         backgroundColor: 'red',
//     }
// }));
//
// const classes = useStyles();

class CurSeqChartViz extends Component {
    constructor() {
        super();
        this.state = {
            data: ""
        }
        // channelVals: [],
        // // lineColor:[],
        // file: 'test_Seq.csv',
        // // xScale: d3.scaleLinear().range([margin.left, width - margin.right]),
        // // yScale: d3.scaleLinear().range([height - margin.bottom, margin.top]),
        // }
        // componentDidMount() {
        //     Promise.all([
        //         fetch(`../../data/jsonOutput.json`),
        //         // fetch(`${process.env.PUBLIC_URL}/mainVizColor.json.json`)
        //     ]).then(responses => Promise.all(responses.map(resp => resp.json())))
        //         .then(([jsonOutput, mainVizColor]) => {
        //             // sf.forEach(day => day.date = new Date(day.date));
        //             // this.setState({channelVals: {sf, ny}});
        //             this.setState(
        //                 {channelVals: {jsonOutput}}
        //             );
        //         });
        //

        const path = `${process.env.PUBLIC_URL}/testSeq.JSON`
        this.loadData(path)
    }

    // }


    loadData = (path) => {
//`${process.env.PUBLIC_URL}/testSeq.JSON`
        d3.json(path).then((data) => {
            console.log(data, 'data in sequenceSel')
            let newdata = [];
            data.forEach(function (d) {
                let dataentry = {}
                dataentry.seqLength = +d.Timestamp;
                dataentry.value = +d["101-SART-June2018-AS_target correct_Channel-1 HbO_126468"];
                newdata.push(dataentry)
            })
            data = newdata
            console.log(data, 'data in sequenceSel')
            this.setState((prevState) => {
                // data: newdata
                const data = prevState.data.map(d => ({
                    seqLength: d.seqLength,
                    value: d.value
                }))
                return {
                    data
                }
            })
        })
    }

    updateSeqSelection = (e) => {
        e.preventDefault();
        this.setState((prevState) => {
            const data = prevState.data.map(d => ({
                seqLength: d.seqLength,
                value: Math.floor((Math.random() * 100) + 1)
            }))
            return {
                data
            }
        })
    }

    render() {
        const {data} = this.state;
        const parentWidth = 350;
        const margins = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
        };
        const width = parentWidth - margins.left - margins.right;
        const height = 200 - margins.top - margins.bottom;
        const ticks = 5;
        const t = transition().duration(1000);
        const xScale = scaleBand()
            .domain(data.map(d => d.seqLength))
            .rangeRound([0, width]).padding(0.1);
        const yScale = scaleLinear()
            .domain(extent(data, d => d.value))
            .range([height, 0])
            .nice();
        const lineGenerator = line()
            .x(d => xScale(d.seqLength))
            .y(d => yScale(d.value))
            .curve(curveMonotoneX);

        return (
            <div>
                <button onClick={this.updateSeqSelection}>Update Sequence</button>
                <svg
                    className="lineChartSvg"
                    width={width + margins.left + margins.right}
                    height={height + margins.top + margins.bottom}
                >
                    <g transform={`translate(${margins.left}, ${margins.top})`}>
                        <XYAxis {...{xScale, yScale, height, ticks, t}} />
                        <Line data={data} xScale={xScale} yScale={yScale} lineGenerator={lineGenerator} width={width}
                              height={height}/>
                    </g>
                </svg>
            </div>
        );
    }
}

export default CurSeqChartViz;
// render(<curSeqLineChart />, document.getElementById('root'));
//
// {seqLength: 0, value: -0.5},
//                 {seqLength: 1, value: 1.3},
//                 {seqLength: 2, value: -2.6},
//                 {seqLength:3, value: 1.11},
//                 {seqLength: 4, value: 0.36},
//                 {seqLength:5, value: -3.2},
//                 {seqLength: 6, value: 0.008},
//                 {seqLength: 7, value: -0.179},
//                 {seqLength: 8, value: 2.36},
//                 {seqLength: 9, value: -0.0017},
//                 {seqLength: 10, value: -3.02},
//                 {seqLength: 11, value: 1.594},