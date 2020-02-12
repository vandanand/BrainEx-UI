import React, {Component} from 'react';
import {scaleBand, scaleLinear} from 'd3-scale';
import XYAxis from './chartComponents/Xy_axis';
import Line from './chartComponents/Line';
import {curveMonotoneX, line} from 'd3-shape';
import {extent} from 'd3-array';
import {transition} from 'd3-transition';

// import LogoButtonCard from '../molecules/Cards/LogoButtonCard';

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
            data: [
                {timeStamp: 'Jan', value: 30},
                {timeStamp: 'Feb', value: 10},
                {timeStamp: 'Mar', value: 50},
                {timeStamp: 'Apr', value: 20},
                {timeStamp: 'May', value: 80},
                {timeStamp: 'Jun', value: 30},
                {timeStamp: 'July', value: 0},
                {timeStamp: 'Aug', value: 20},
                {timeStamp: 'Sep', value: 100},
                {timeStamp: 'Oct', value: 55},
                {timeStamp: 'Nov', value: 60},
                {timeStamp: 'Dec', value: 80},
                {timeStamp: 'Jan', value: 30},
                {timeStamp: 'Feb', value: 10},
                {timeStamp: 'Mar', value: 50},
                {timeStamp: 'Apr', value: 20},
                {timeStamp: 'May', value: 80},
                {timeStamp: 'Jun', value: 30},
                {timeStamp: 'July', value: 0},
                {timeStamp: 'Aug', value: 20},
                {timeStamp: 'Sep', value: 100},
                {timeStamp: 'Oct', value: 55},
                {timeStamp: 'Nov', value: 60},
                {timeStamp: 'Dec', value: 80},

            ],
        }
    }

    randomData = (e) => {
        e.preventDefault();
        this.setState((prevState) => {
            const data = prevState.data.map(d => ({
                timeStamp: d.timeStamp,
                value: Math.floor((Math.random() * 100) + 1)
            }))
            return {
                data
            }
        })
    }

    render() {
        const {data} = this.state;
        const parentWidth = 500;

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
            .domain(data.map(d => d.timeStamp))
            .rangeRound([0, width]).padding(0.1);

        const yScale = scaleLinear()
            .domain(extent(data, d => d.value))
            .range([height, 0])
            .nice();

        const lineGenerator = line()
            .x(d => xScale(d.timeStamp))
            .y(d => yScale(d.value))
            .curve(curveMonotoneX);

        return (
            <div>
                <button onClick={this.randomData}>Randomize data</button>
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
