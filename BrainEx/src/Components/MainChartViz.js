import React, {Component} from 'react';
import * as d3 from 'd3';

const width = 750;
const height = 460;
const margin = {top: 25, right: 25, bottom: 25, left: 25};
const red = '#eb6a5b';
const blue = '#52b6ca';
const black = '#000000';

class MainChartViz extends Component {
    state = {
        lines: null,
        lineColorList: null,
        lineCol: null,
        // d3 helpers
        xScale: d3.scaleLinear().range([margin.left, width - margin.right]),
        yScale: d3.scaleLinear().range([height - margin.bottom, margin.top]),
        lineGenerator: d3.line().curve(d3.curveCardinal),
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
        var sliced = allFields.slice(1, numCol); //gives all the column names of data, excluding the first column
        // data has changed, so recalculate scale domains
        const timeDomain = d3.extent(data, d => d[firstCol]);
        // const valMax = d3.max(data, d => d[sliced]);
        // const valMin = d3.min(data, d => d[sliced]);
        xScale.domain(timeDomain);
        yScale.domain([-5, 5]);
        // yScale.domain([valMin, valMax]); this should be updated to use the global min/max
        lineGenerator.x(d => xScale(d[firstCol]));
        // calculate line for lows
        var lines = [];
        for (let cname of sliced) {
            lineGenerator
                .defined(d => !isNaN(d[cname]))
                .y(d => yScale(d[cname]));
            lines = lines + lineGenerator(data);
        }

        //currently does not populate one line at a time
        var lineColorList = ["#d8b365", "#f5f5f5", "#5ab4ac"];
        let lineCol;
        for (let col of lineColorList) {
            lineCol = col;
            console.log(lineCol, 'linecol');
        }


        return {lines, lineCol};
    }

    componentDidUpdate() {
        d3.select(this.refs.xAxis).call(this.xAxis);
        d3.select(this.refs.yAxis).call(this.yAxis);
    }

    render() {
        return (
            <svg width={width} height={height}>
                <path d={this.state.lines} fill='none' stroke={this.state.lineCol} strokeWidth='2'/>
                <g>
                    <g ref='xAxis' transform={`translate(0, ${height - margin.bottom})`}/>
                    <g ref='yAxis' transform={`translate(${margin.left}, 0)`}/>
                </g>
            </svg>
        );
    }
}

export default MainChartViz;


