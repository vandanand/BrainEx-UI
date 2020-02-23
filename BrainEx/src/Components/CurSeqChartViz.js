import React, {Component} from 'react';
import {scaleBand, scaleLinear} from 'd3-scale';
import XYAxis from './chartComponents/Xy_axis';
import Line from './chartComponents/Line';
import {curveMonotoneX, line} from 'd3-shape';
import {extent} from 'd3-array';
import {transition} from 'd3-transition';

class CurSeqChartViz extends Component {
    constructor() {
        super();
        this.state = {
            data: [
                {seqLength: 0, value: -0.5},
                {seqLength: 1, value: 1.3},
                {seqLength: 2, value: -2.6},
                {seqLength: 3, value: 1.11},
                {seqLength: 4, value: 0.36},
                {seqLength: 5, value: -3.2},
                {seqLength: 6, value: 0.008},
                {seqLength: 7, value: -0.179},
                {seqLength: 8, value: 2.36},
                {seqLength: 9, value: -0.0017},
                {seqLength: 10, value: -3.02},
                {seqLength: 11, value: 1.594},
            ],
        }
    }

    UpdateData = (e) => {
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
                <button onClick={this.UpdateData}>Update data</button>
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
