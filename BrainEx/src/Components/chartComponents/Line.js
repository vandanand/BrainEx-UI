import React from 'react';
import {select, selectAll} from 'd3-selection';
import {transition} from 'd3-transition';

class Line extends React.Component {
    constructor() {
        super();
        this.ref = React.createRef();
    }

    componentDidMount() {
        const node = this.ref.current;
        const {xScale, yScale, data, lineGenerator} = this.props;

        const initialData = data.map(d => ({
            timeStamp: d.timeStamp,
            value: 0
        }));

        select(node)
            .append('path')
            .datum(initialData)
            .attr('id', 'line')
            .attr('stroke', 'black')
            .attr('stroke-width', 2)
            .attr('fill', 'none')
            .attr('d', lineGenerator);
        this.updateChart()
    }

    componentDidUpdate() {
        this.updateChart();
    }

    updateChart() {
        const {
            lineGenerator, xScale, yScale, data,
        } = this.props;

        const t = transition().duration(1000);

        const line = select('#line');
        const dot = selectAll('.circle');

        line
            .datum(data)
            .transition(t)
            .attr('d', lineGenerator);
    }

    render() {
        return <g className="line-group" ref={this.ref}/>;
    }
}

export default Line;
