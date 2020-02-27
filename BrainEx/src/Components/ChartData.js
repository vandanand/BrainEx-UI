import React, {Component} from 'react';
import MainChartViz from './MainChartViz';
import {colors} from "@material-ui/core";
import {useTheme} from '@material-ui/core/styles';
import {ResponsiveContainer} from 'recharts';
import Title from './Title';

// export default function Chart() {
//     const theme = useTheme();

class ChartData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // channelVals: [],
            // file: 'jsonOutput',
            data: [],// initial value
            lineColorList: ['#FFFFFF'],
            lineData: [{
                "Timestamp": "0",
                "DataVal": 0
            }],
        }
        // this.dataFormatter = this.dataFormatter.bind(this);
    }


    componentDidUpdate(nextProps, nextState, snapshot) {
        // only update props if props have changed
        if (nextProps.data !== this.props.data) {
            function dataFormatter(lineData) {
                console.log(lineData, 'lineData as received as props');
                let jsonData = lineData.map(d => {
                    let mappedData = {};
                    mappedData[d.id] = d.sequence;
                    return mappedData
                });
                console.log(jsonData, 'jsonData in data formatter');
                let parsedLineData = [];
                let firstData = Object.values(jsonData[0])[0];
                let timeLength = firstData.length;
                for (let i = 0; i < timeLength; i++) {
                    parsedLineData.push({"Timestamp": i + ""})
                }
                jsonData.forEach(function (d) {
                    let keys = Object.keys(d);
                    let id = keys[0] + "";
                    let dataArr = d[id];
                    for (let i = 0; i < dataArr.length; i++) {
                        parsedLineData[i][id] = dataArr[i]
                    }
                });
                console.log('parsedLineData in data formatter', parsedLineData);
                console.log('jSONdata in the end of data formatter', jsonData);
                return parsedLineData
            }

            let linePaths = dataFormatter(this.props.data);
            // keep this because it prevents it from entering an infinite rerender loop
            console.log('data before setting the state', this.props.data);
            console.log("line data before setting the state", linePaths);
            this.setState({
                data: this.props.data,
                lineData: linePaths,
                lineColorList: this.props.data.map((d) => d.color).map(i => '#' + i),
                //first get the color from the data object, then append pound sign to get the colors in proper hex format
            }, () => {
                console.log("just data received by Chart", this.state.data);
                console.log("line data received by Chart", this.state.lineData);
                console.log("line color data received by Chart", this.state.lineColorList);
            });
        }
    }


    // componentDidMount() {
    //     this.setState(
    //         {
    //             data: this.props.data,
    //             lineData: this.dataFormatter(this.props.data),
    //             lineColorList: this.props.data.map((d) => d.color).map(i => '#' + i),
    //         })
    // }


// updateFile = (e) => {
//     // this.setState({file: e.target.value});
//     this.setState({});
// }

    render() {
        const drawLines = this.state.lineData;
        const lineColors = this.state.lineColorList;
        return (
            <div className="Chart">
                <React.Fragment>
                    <Title>Query Result</Title>
                    <ResponsiveContainer>
                        <MainChartViz lineData={drawLines} lineColorList={lineColors}/>
                    </ResponsiveContainer>
                </React.Fragment>
            </div>
        );
    }
}

export default ChartData;





