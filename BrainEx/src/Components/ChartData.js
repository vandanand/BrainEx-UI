import React, { Component } from 'react';
import MainChartViz from './MainChartViz';

class ChartData extends Component {
    state = {
        // channelVals: {},
        // ['Subject Name']: '101-SART-June2018-AS',
        temps:[],
        city: 'csvjson', // city whose temperatures to show
    };

    componentDidMount() {
        Promise.all([
            fetch(`${process.env.PUBLIC_URL}/csvjson.json`),
            // fetch(`${process.env.PUBLIC_URL}/ny.json`),
        ]).then(responses => Promise.all(responses.map(resp => resp.json())))
            // .then(([sf, ny]) => {
            .then(([csvjson]) => {
                // sf.forEach(day => day.date = new Date(day.date));
                // ny.forEach(day => day.date = new Date(day.date));
                // sf.forEach(Start_Time => d['Start Time'] = new Start_Time);
                // this.setState({temps: {sf, ny}});
                this.setState({temps:{csvjson}});
            });
    }
    //
    // updateCity = (e) => {
    //     this.setState({city: e.target.value});
    // }

    render() {
        const data = this.state.temps[this.state.city];

        return (
            <div className="App">
                <h1>
                    2017 Temperatures for
                    <select name='city' onChange={this.updateCity}>
                        {
                            [
                                {label: 'San Francisco', value: 'csvjson'},
                                // {label: 'New York', value: 'ny'},
                            ].map(option => {
                                // return (<option key={option.value} value={option.value}>{option.label}</option>);
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

export default ChartData;
