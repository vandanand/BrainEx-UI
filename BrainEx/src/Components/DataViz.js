// //var data = [];
// var data = [{"depthNum": 0, "depth": 4}, {"depthNum": 1, "depth": 8}, {"depthNum": 2, "depth": 10}, {
//     "depthNum": 3,
//     "depth": 11
// }, {"depthNum": 4, "depth": 15}, {"depthNum": 5, "depth": 19}, {"depthNum": 6, "depth": 22}, {
//     "depthNum": 7,
//     "depth": 23
// }, {"depthNum": 8, "depth": 30}];
// var innerHeight = 900;
// var innerWidth = 250;
// var svg = d3.select("svg");
// var margin = {top: 20, right: 20, bottom: 110, left: 40};
// var margin2 = {top: 436, right: 20, bottom: 30, left: 40};
// var width = +svg.attr("width") - margin.left - margin.right;
// var width2 = +svg.attr("width") - margin2.left - margin2.right;
// var height = +svg.attr("height") - margin.top - margin.bottom;
// var height2 = +svg.attr("height") - margin2.top - margin2.bottom;
//
//
// var xScale = d3.scaleLinear().range([0, width]);
// var xScale2 = d3.scaleLinear().range([0, width]);
// var yScale = d3.scaleLinear().range([height, 0]);
// var yScale2 = d3.scaleLinear().range([height2, 0]);
//
// //console.log(xScale);
//
// var xAxis = d3.axisBottom(xScale),
//     xAxis2 = d3.axisBottom(xScale2),
//     yAxis = d3.axisLeft(yScale),
//     yAxis2 = d3.axisLeft(yScale2);
//
// var brush = d3.brushX()
//     .extent([[0, 0], [width, height2]])
//     .on("brush end", brushed);
//
// var zoom = d3.zoom()
//     .scaleExtent([1, Infinity])
//     .translateExtent([[0, 0], [width, height]])
//     .extent([[0, 0], [width, height]])
//     .on("zoom", zoomed);
//
// var line = d3.line()
//     .x(function (d) {
//         return xScale(d.depthNum);
//     })
//     .y(function (d) {
//         return yScale(d.depth);
//     });
//
// var line2 = d3.line()
//     .x(function (d) {
//         return xScale2(d.depthNum);
//     })
//     .y(function (d) {
//         return yScale2(d.depth);
//     });
//
// var clip = svg.append("defs").append("svg:clipPath")
//     .attr("id", "clip")
//     .append("svg:rect")
//     .attr("width", width)
//     .attr("height", height)
//     .attr("x", 0)
//     .attr("y", 0);
//
//
// var Line_chart = svg.append("g")
//     .attr("class", "focus")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
//     .attr("clip-path", "url(#clip)");
//
//
// var focus = svg.append("g")
//     .attr("class", "focus")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
// var context = svg.append("g")
//     .attr("class", "context")
//     .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
//
// xScale.domain(d3.extent(data, function (d) {
//     return d.depthNum;
// }));
// yScale.domain([0, d3.max(data, function (d) {
//     return d.depth;
// })]);
// xScale2.domain(xScale.domain());
// yScale2.domain(yScale.domain());
//
//
// focus.append("g")
//     .attr("class", "axis axis--x")
//     .attr("transform", "translate(0," + height + ")")
//     .call(xAxis);
//
// focus.append("g")
//     .attr("class", "axis axis--y")
//     .call(yAxis);
//
// Line_chart.append("path")
//     .datum(data)
//     .attr("class", "line")
//     .attr("d", line);
//
// context.append("path")
//     .datum(data)
//     .attr("class", "line")
//     .attr("d", line2);
//
//
// context.append("g")
//     .attr("class", "axis axis--x")
//     .attr("transform", "translate(0," + height2 + ")")
//     .call(xAxis2);
//
// context.append("g")
//     .attr("class", "brush")
//     .call(brush)
//     .call(brush.move, xScale.range());
//
// svg.append("rect")
//     .attr("class", "zoom")
//     .attr("width", width)
//     .attr("height", height)
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
//     .call(zoom);
//
// function brushed() {
//     if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
//     var s = d3.event.selection || xScale2.range();
//     xScale.domain(s.map(xScale2.invert, xScale2));
//     Line_chart.select(".line").attr("d", line);
//     focus.select(".axis--x").call(xAxis);
//     svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
//         .scale(width / (s[1] - s[0]))
//         .translate(-s[0], 0));
// }
//
// function zoomed() {
//     if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
//     var t = d3.event.transform;
//     xScale.domain(t.rescaleX(xScale2).domain());
//     Line_chart.select(".line").attr("d", line);
//     focus.select(".axis--x").call(xAxis);
//     context.select(".brush").call(brush.move, xScale.range().map(t.invertX, t));
// }
//
// //genLine(10);
// //console.log(data);
//
//
//
import React, { Component } from 'react';
import './App.css';
import MainChartViz from './MainChartViz';

class App extends Component {
    state = {
        channelVals: {},
        'Subject Name': "101-SART-June2018-AS" // city whose temperatures to show
        //default should be to display all the data and then toggle the table to show/hide certain rows of data
    };

    componentDidMount() {
        Promise.all([
            fetch(`${process.env.PUBLIC_URL}/csvjson.json`),
        ]).then(responses => Promise.all(responses.map(resp => resp.json())))
            .then(([sf, ny]) => {
                sf.forEach(day => day.date = new Date(day.date));
                // ny.forEach(day => day.date = new Date(day.date));
                // this.setState({temps: {sf, ny}});
            });
    }

    updateCity = (e) => {
        this.setState({city: e.target.value});
    }

    render() {
        // const data = this.state.temps[this.state.city];
        const data = this.state.channelVals;
        return (
            <div className="App">
                <h1>
                    2017 Temperatures for
                    <select name='city' onChange={this.updateCity}>
                        {
                            [
                                {label: 'San Francisco', value: 'sf'},
                                {label: 'New York', value: 'ny'},
                            ].map(option => {
                                return (<option key={option.value} value={option.value}>{option.label}</option>);
                            })
                        }
                    </select>
                </h1>
                <MainChartViz data={data} />
            </div>
        );
    }
}

export default App;
