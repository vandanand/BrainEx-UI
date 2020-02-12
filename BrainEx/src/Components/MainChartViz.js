import React, { Component } from 'react';
import * as d3 from 'd3';

const width = 650;
const height = 400;
const margin = {top: 20, right: 5, bottom: 20, left: 35};
const red = '#eb6a5b';
const blue = '#52b6ca';
const black= '#000000';

class MainChartViz extends Component {
    state = {
        // highs: null, // svg path command for all the high temps
        // lows: null, // svg path command for low temps,
        // avg: null,
        highs:null,
        lows:null,
        avg:null,
        // d3 helpers
        xScale: d3.scaleTime().range([margin.left, width - margin.right]),
        yScale: d3.scaleLinear().range([height - margin.bottom, margin.top]),
        lineGenerator: d3.line(),
    };

    xAxis = d3.axisBottom().scale(this.state.xScale)
        .tickFormat(d => `${d}`);
    //TODO: change this to regular axis
    yAxis = d3.axisLeft().scale(this.state.yScale)
        .tickFormat(d => `${d}`);

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!nextProps.data) return null; // data hasn't been loaded yet so do nothing
        const {data} = nextProps;
        const {xScale, yScale, lineGenerator} = prevState;

        // data has changed, so recalculate scale domains
        const timeDomain = d3.extent(data, d => d['End Time']);
        const tempMax = d3.max(data, d => d['__3']);
        xScale.domain(timeDomain);
        yScale.domain([0, tempMax]);

        lineGenerator.x(d => xScale(d['End Time']));
        // calculate line for lows
        lineGenerator.y(d => yScale(d['__3']));
        const lows = lineGenerator(data);
        // and then highs
        lineGenerator.y(d => yScale(d['__2']));
        const highs = lineGenerator(data);
        //do the average
        lineGenerator.y(d => yScale(d['__1']));
        const avg = lineGenerator(data);
        return {lows, highs, avg};
    }

    componentDidUpdate() {
        d3.select(this.refs.xAxis).call(this.xAxis);
        d3.select(this.refs.yAxis).call(this.yAxis);
    }

    render() {

        return (
            <svg width={width} height={height}>
                <path d={this.state.highs} fill='none' stroke={red} strokeWidth='2' />
                <path d={this.state.lows} fill='none' stroke={blue} strokeWidth='2' />
                <path d={this.state.avg} fill='none' stroke={black} strokeWidth='2' />
                <g>
                    <g ref='xAxis' transform={`translate(0, ${height - margin.bottom})`} />
                    <g ref='yAxis' transform={`translate(${margin.left}, 0)`} />
                </g>
            </svg>
        );
    }
}

export default MainChartViz;
