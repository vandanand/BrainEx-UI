import React, {Component} from 'react';
import MainChartViz from './MainChartViz';
import {colors} from "@material-ui/core";
import {useTheme} from '@material-ui/core/styles';
import {ResponsiveContainer} from 'recharts';
import Title from './Title';

// export default function Chart() {
//     const theme = useTheme();

export default class ChartData extends Component {
        constructor(props) {
            super(props);
            this.state = {
                channelVals: [],
                // lineColor:[],
                file: 'jsonOutput',
                data: [],// initial value
                lineColorList: ["#d8b365", "#f5f5f5", "#5ab4ac"],
            }
        }

        componentDidUpdate(nextProps, nextState, snapshot) {
            // only update props if props have changed
            if (nextProps.data !== this.props.data) { // keep this because it prevents it from entering an infinite rerender loop
                this.setState({
                    data: this.props.data,
                    lineColorList: this.props.lineColorList,
                }, () => {
                    console.log("data received by Chart");
                    console.log(this.state.data);
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

    render() {
        const data = this.state.channelVals[this.state.file];
        const lineColorList = this.state.lineColorList;
        return (
            <React.Fragment>
                <Title>Query Result</Title>
                <ResponsiveContainer>
                    <MainChartViz data={data} lineColorList={lineColorList}/>
                </ResponsiveContainer>
            </React.Fragment>
        );
    }
}





