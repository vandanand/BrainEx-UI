import React, {Component} from 'react';
import * as d3 from 'd3';

const width = 750;
const height = 460;
const margin = {top: 25, right: 25, bottom: 25, left: 25};
const red = '#eb6a5b';
const blue = '#52b6ca';
const black = '#000000';


function colRange(start, end) {
    var colInd = [];
    for (let i = start; i <= end; i++) {
        colInd.push(i);
    }
    return colInd;
}

class MainChartViz extends Component {
    state = {
        lines: null,
        // d3 helpers
        xScale: d3.scaleLinear().range([margin.left, width - margin.right]),
        yScale: d3.scaleLinear().range([height - margin.bottom, margin.top]),
        lineGenerator: d3.line(),
    };

    xAxis = d3.axisBottom().scale(this.state.xScale)
        .tickFormat(d => `${d}`);
    yAxis = d3.axisLeft().scale(this.state.yScale)
        .tickFormat(d => `${d}`);

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!nextProps.data) return null; // data hasn't been loaded yet so do nothing
        const {data} = nextProps;
        const {xScale, yScale, lineGenerator} = prevState;
        var allFields = Object.keys(data[0]);
        var firstCol = allFields[0]; //gives the column name of the first column, which is the string "Timestamp"
        var numCol = allFields.length; //gives the total number of columns in the data, including the first non-data column
        // var colInd=colRange(1,numCol-1); //prints out a list of integer index from 1 to the last column of data
        var sliced = allFields.slice(1, numCol); //gives all the column names of data, excluding the first column
        // data has changed, so recalculate scale domains
        // const timeDomain = d3.extent(data, d => d.Timestamp);
        // const valMax = d3.max(data, d => d[sliced]);
        // const valMin = d3.min(data, d => d[sliced]);
        xScale.domain([0, 3]);
        yScale.domain([-5, 5]);
        // yScale.domain([valMin, valMax]);
        lineGenerator.x(d => xScale(d.Timestamp));
        // calculate line for lows
        var lines = [];
        for (let cname of sliced) {
            // console.log(sliced[0]);
            lineGenerator
                .defined(d => !isNaN(d[cname]))
                .y(d => yScale(d[cname]));
            lines = lines + lineGenerator(data);
        }
        return {lines};
    }

    componentDidUpdate() {
        d3.select(this.refs.xAxis).call(this.xAxis);
        d3.select(this.refs.yAxis).call(this.yAxis);
    }

    render() {
        return (
            <svg width={width} height={height}>
                <path d={this.state.lines} fill='none' stroke={red} strokeWidth='2'/>
                <g>
                    <g ref='xAxis' transform={`translate(0, ${height - margin.bottom})`}/>
                    <g ref='yAxis' transform={`translate(${margin.left}, 0)`}/>
                </g>
            </svg>
        );
    }
}

export default MainChartViz;


