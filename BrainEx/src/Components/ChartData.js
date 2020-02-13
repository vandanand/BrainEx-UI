import React, { Component } from 'react';
import MainChartViz from './MainChartViz';

class ChartData extends Component {
    state = {
        // channelVals: {},
        // ['Subject Name']: '101-SART-June2018-AS',
        channelVals: [],
        file: 'jsonOutput', // city whose temperatures to show
    };

    componentDidMount() {
        Promise.all([
            fetch(`${process.env.PUBLIC_URL}/jsonOutput.json`),
            fetch(`${process.env.PUBLIC_URL}/jsonOutput_Copy.json`),

            // fetch(`${process.env.PUBLIC_URL}/ny.json`),

        ]).then(responses => Promise.all(responses.map(resp => resp.json())))
            // .then(([sf, ny]) => {
            .then(([jsonOutput, jsonOutput_Copy]) => {
                // sf.forEach(day => day.date = new Date(day.date));
                // ny.forEach(day => day.date = new Date(day.date));
                // sf.forEach(Start_Time => d['Start Time'] = new Start_Time);
                // this.setState({channelVals: {sf, ny}});
                this.setState({channelVals: {jsonOutput, jsonOutput_Copy}});
            });
    }

    updateFile = (e) => {
        this.setState({file: e.target.value});
    }

    render() {
        const data = this.state.channelVals[this.state.file];

        return (
            <div className="Chart">
                <h5>
                    <select name='updateFile' onChange={this.updateFile}>
                        {
                            [
                                {label: 'file-1', value: 'jsonOutput'},
                                {label: 'file-2', value: 'jsonOutput_Copy'},

                                // {label: 'New York', value: 'ny'},
                            ].map(option => {
                                // return (<option key={option.value} value={option.value}>{option.label}</option>);
                                return (<option key={option.value} value={option.value}>{option.label}</option>);
                            })
                        }
                    </select>
                </h5>
                <MainChartViz data={data}/>
            </div>
        );
    }
}

export default ChartData;
