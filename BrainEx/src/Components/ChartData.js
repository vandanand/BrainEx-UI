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
            lineColorList: [],
            lineData: [],
        }
    }

    componentDidUpdate(nextProps, nextState, snapshot) {
        // only update props if props have changed
        if (nextProps.data !== this.props.data) {
            function dataFormatter(lineData) {
                let jsonData = lineData.map(d => {
                    let mappedData = {};
                    mappedData[d.id] = d.sequence;
                    return mappedData
                });
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
                return parsedLineData
            }

            console.log(dataFormatter(this.props.data));

            // keep this because it prevents it from entering an infinite rerender loop
            this.setState({
                data: this.props.data,
                //this data still needs to be parsed
                lineData: dataFormatter(this.props.data),
                // .map(d => {
                // let mappedData = {};
                // mappedData[d.id] = d.sequence}),
                lineColorList: this.props.data.map((d) => d.color).map(i => '#' + i),
                //first get the color from the data object, then append pound sign to get the colors in proper hex format
            }, () => {
                console.log("line data received by Chart", this.state.lineData);
                // this.setState({
                //     lineData: lineData,
                // });
                // parse the receivedData here before passing it to states

            });
        }
    }

    //
    componentDidMount() {
        // Promise.all([
        //     fetch(`${process.env.PUBLIC_URL}/jsonOutput.json`),
        // ]).then(responses => Promise.all(responses.map(resp => resp.json())))
        //     .then(([jsonOutput]) => {
        //         // sf.forEach(day => day.date = new Date(day.date));
        //         // this.setState({channelVals: {sf, ny}});
        //         this.setState(
        //             {channelVals: {jsonOutput}}
        //         );
        //     });
        this.setState(
            {lineData: []}
        );

    }

    // updateFile = (e) => {
    //     // this.setState({file: e.target.value});
    //     this.setState({file: 'jsonOutput'});
    // }

    render() {
        const lineData = this.state.lineData;
        const lineColors = this.state.lineColorList;
        return (
            <div className="Chart"
                // key={this.state.lineData}
            >
                <React.Fragment>
                    <Title>Query Result</Title>
                    <ResponsiveContainer>
                        <MainChartViz lineData={lineData} lineColorList={lineColors}/>
                    </ResponsiveContainer>
                </React.Fragment>
            </div>
        );
    }
}

export default ChartData;





