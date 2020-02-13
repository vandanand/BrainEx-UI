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
        // highs: null, // svg path command for all the high channelVals
        // lows: null, // svg path command for low channelVals,
        // avg: null,
        highs: null,
        lows: null,
        avg: null,
        // d3 helpers
        xScale: d3.scaleLinear().range([margin.left, width - margin.right]),
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

        //try to find all the headers to form a group array for D3 dropdown
        console.log(data);
        console.log(Object.keys(data)[1]);
        console.log(Object.getOwnPropertyNames(data));
        // data has changed, so recalculate scale domains
        const timeDomain = d3.extent(data, d => d.Timestamp);
        const valMax = d3.max(data, d => d["101-SART-June2018-AS_target correct_Channel-1 HbO_126468"]);
        const valMin = d3.min(data, d => d["101-SART-June2018-AS_target correct_Channel-1 HbO_126468"]);
        xScale.domain([0, 280]);
        yScale.domain([-3, 3]);

        lineGenerator.x(d => xScale(d.Timestamp));
        // calculate line for lows
        lineGenerator.y(d => yScale(d["101-SART-June2018-AS_target correct_Channel-1 HbO_126468"]));
        const lows = lineGenerator(data);
        // and then highs
        lineGenerator.y(d => yScale(d["101-SART-June2018-AS_target correct_Channel-1 HbO_600024"]));
        const highs = lineGenerator(data);
        //do the average
        lineGenerator.y(d => yScale(d["101-SART-June2018-AS_target correct_Channel-1 HbO_631505"]));
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
                    <g ref='xAxis' transform={`translate(0, ${height - margin.bottom})`}/>
                    <g ref='yAxis' transform={`translate(${margin.left}, 0)`}/>
                </g>
            </svg>
        );
    }
}

export default MainChartViz;


//TODO: check out this link https://www.d3-graph-gallery.com/graph/connectedscatter_legend.html