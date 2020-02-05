// work in progress for D3-React

"use strict";

var React = require('react');
var d3 = require('d3');

let margin = {top: 0, right: 10, bottom: 25, left: 10},
    width = 200 - margin.left - margin.right,
    height = 60 - margin.top - margin.bottom;

let histogramStyle = {
    "width": width,
    "height": (height + 15)
};

let Chart = React.createClass({
    render: function () {
        return (
            <div id={this.props.id} style={histogramStyle}>
            </div>
        );
    }
});

let Chart = React.createClass({
    shouldComponentUpdate() {
        return false;
    },
..
})