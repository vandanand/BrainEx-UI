import React, { Component } from 'react';
import MainChartViz from './MainChartViz';

class ChartData extends Component {
    state = {
        channelVals: [],
        file: 'jsonOutput', // city whose temperatures to show
    };

    componentDidMount() {
        Promise.all([
            fetch(`${process.env.PUBLIC_URL}/jsonOutput.json`)

        ]).then(responses => Promise.all(responses.map(resp => resp.json())))
            // .then(([sf, ny]) => {
            .then(([jsonOutput]) => {
                // sf.forEach(day => day.date = new Date(day.date));
                // ny.forEach(day => day.date = new Date(day.date));
                // sf.forEach(Start_Time => d['Start Time'] = new Start_Time);
                // this.setState({channelVals: {sf, ny}});
                // alert(JSON.Stringify(jsonOutput));
                this.setState({channelVals: {jsonOutput}});
            });
    }

    updateFile = (e) => {
        // this.setState({file: e.target.value});
        this.setState({file: 'jsonOutput'});
    }

    render() {
        const data = this.state.channelVals[this.state.file];
        console.log(data)
        return (
            <div className="Chart">
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
