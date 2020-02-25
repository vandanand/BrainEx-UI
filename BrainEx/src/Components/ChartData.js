import React, {Component} from 'react';
import MainChartViz from './MainChartViz';
import {colors} from "@material-ui/core";
import {useTheme} from '@material-ui/core/styles';
import {ResponsiveContainer} from 'recharts';
import Title from './Title';
// import { Series, DataFrame } from 'pandas-js';

// export default function Chart() {
//     const theme = useTheme();

class ChartData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            channelVals: [],
            file: 'jsonOutput',
            data: [],// initial value
            lineColorList: [],
            lineData: [],
        }
    }

    componentDidUpdate(nextProps, nextState, snapshot) {
        // only update props if props have changed
        // console.log(nextProps.data, 'nextPropsData');
        if (nextProps.data !== this.props.data) { // keep this because it prevents it from entering an infinite rerender loop
            this.setState({
                data: this.props.data,
                //this data still needs to be parsed
                // lineData: lineData,
                lineColorList: this.props.data.map((d) => d.color).map(i => '#' + i),
                //first get the color from the data object, then append pound sign to get the colors in proper hex format
            }, () => {
                // console.log("color data received by Chart", this.state.lineColorList);
                let lineData = this.state.data.map(d => {
                    let mappedData = {}
                    mappedData[d.id] = d.sequence;
                    return mappedData
                });
                console.log(lineData, 'I am LineData!')
                this.setState({
                    lineData: lineData,
                });
                // parse the receivedData here before passing it to states
                console.log("line data received by Chart", this.state.lineData);

            });
        }
    }

    componentDidMount() {
        Promise.all([
            fetch(`${process.env.PUBLIC_URL}/jsonOutput.json`),
        ]).then(responses => Promise.all(responses.map(resp => resp.json())))
            .then(([jsonOutput]) => {
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
    }

    render() {
        const data = this.state.channelVals[this.state.file];
        const lineColors = this.state.lineColorList;
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
                <React.Fragment>
                    <Title>Query Result</Title>
                    <ResponsiveContainer>
                        {/*<ChartData/>*/}
                        <MainChartViz data={data} lineColorList={lineColors}/>
                    </ResponsiveContainer>
                </React.Fragment>
            </div>
        );
    }
}

//
//     return (
//         <React.Fragment>
//             <Title>Query Result</Title>
//             <ResponsiveContainer>
//                 <ChartData/>
//             </ResponsiveContainer>
//         </React.Fragment>
//     );
// }
export default ChartData;





