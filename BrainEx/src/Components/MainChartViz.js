import React, {Component} from 'react';
import * as d3 from 'd3';

const width = 750;
const height = 460;
const margin = {top: 25, right: 25, bottom: 25, left: 25};

class MainChartViz extends Component {
    state = {
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
        console.log(nextProps.lineData, 'testing Props.lineData');
        console.log(nextProps.lineColorList, 'testing Props.lineColorList');
        if (!nextProps.data) return null; // lineData hasn't been loaded yet so do nothing
        const {lineData, lineColorList} = nextProps;
        // console.log(lineColorList, 'lineColorListinMain');
        console.log(lineData, 'lineDataInMain');
        console.log(lineColorList, 'lineColorListInMain');
        const {xScale, yScale, lineGenerator} = prevState;
        var allFields = Object.keys(lineData[0]);
        var firstCol = allFields[0]; //gives the column name of the first column, which is the string "Timestamp"
        var numCol = allFields.length; //gives the total number of columns in the lineData, including the first non-lineData column
        var sliced = allFields.slice(1, numCol); //gives all the column names of lineData, excluding the first column
        // lineData has changed, so recalculate scale domains
        const timeDomain = d3.extent(lineData, d => d[firstCol]);
        // const valMax = d3.max(lineData[sliced],(d) => d[sliced]);
        // const valMin = d3.min(lineData, d => d[sliced]);
        xScale.domain(timeDomain);
        yScale.domain([-5, 5]);
        // yScale.domain([valMin, valMax]); this should be updated to use the global min/max
        for (let col of lineColorList) {
            var lineCol = col;
        }
        lineGenerator.x(d => xScale(d[firstCol]));
        // calculate line for drawing paths
        let lines = [];
        for (let cname of sliced) {
            lineGenerator
                .defined(d => !isNaN(d[cname]))
                .y(d => yScale(d[cname]));
            lines.push(lineGenerator(lineData));
        }

        lines.forEach(function (d, i) {
            d3.selectAll("#svg")
                .append("path")
                .attr("fill", "none")
                .attr("d", lines[i])
                .attr("stroke", lineColorList[i])
        })
        return {lines, lineCol};
    }

    componentDidUpdate() {
        d3.select(this.refs.xAxis).call(this.xAxis);
        d3.select(this.refs.yAxis).call(this.yAxis);
    }

    render() {
        return (
            <svg id="svg" width={width} height={height}>
                {/*{this.state.lines.map((d, i) => (<path key={i} d={d.y} fill='none' stroke={d.lineCol} strokeWidth='2'/>))}*/}
                {/*<path d={this.state.lines} fill='none' stroke={black} strokeWidth='2'/>*/}
                <g>
                    <g ref='xAxis' transform={`translate(0, ${height - margin.bottom})`}/>
                    <g ref='yAxis' transform={`translate(${margin.left}, 0)`}/>
                </g>
            </svg>
        );
    }
}

export default MainChartViz;


