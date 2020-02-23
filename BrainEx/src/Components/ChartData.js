import React, { Component } from 'react';
import MainChartViz from './MainChartViz';
import {colors} from "@material-ui/core";

class ChartData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            channelVals: [],
            // lineColor:[],
            file: 'jsonOutput', // city whose temperatures to show,
            data: [] // initial value
        }
    }

    componentDidUpdate(nextProps, nextState, snapshot) {
        // only update props if props have changed
        if (nextProps.data !== this.props.data) { // keep this because it prevents it from entering an infinite rerender loop
            this.setState({
                data: this.props.data
            }, () => {
                console.log("data received by Chart");
                console.log(this.state.data);
            });
        }
    }

    componentDidMount() {
        //todo @Kyra - mg (replace this with api call)
        Promise.all([
            fetch(`${process.env.PUBLIC_URL}/jsonOutput.json`),
            // fetch(`${process.env.PUBLIC_URL}/mainVizColor.json`)
        ]).then(responses => Promise.all(responses.map(resp => resp.json())))
            .then(([jsonOutput, mainVizColor]) => {
                // sf.forEach(day => day.date = new Date(day.date));
                // this.setState({channelVals: {sf, ny}});
                this.setState(
                    {channelVals: {jsonOutput}}
                );
            });
    }

    updateFile = (e) => {
        // this.setState({file: e.target.value});
        this.setState({file: 'jsonOutput'});
    };

    render() {
        const data = this.state.channelVals[this.state.file];
        return (
            <div key={this.state.data} className="Chart">
                {/*<h5>*/}
                {/*    <select name='updateFile' onChange={this.updateFile}>*/}
                {/*// this can be changed to the table click for changing files*/}
                {/*        {*/}
                {/*            [// {label: 'New York', value: 'ny'},*/}
                {/*            ].map(option => {*/}
                {/*                // return (<option key={option.value} value={option.value}>{option.label}</option>);*/}
                {/*                return (<option key={option.value} value={option.value}>{option.label}</option>);*/}
                {/*            })*/}
                {/*        }*/}
                {/*    </select>*/}
                {/*</h5>*/}
                <MainChartViz data={data}/>
            </div>
        );
    }
}

export default ChartData;
