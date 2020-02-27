import React, {useState, useRef, useEffect} from 'react';
import {useTheme} from '@material-ui/core/styles';
import {Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ReferenceArea, Brush} from 'recharts';

export default class MainChartViz extends React.Component {
    state = {
        lineData: this.props.lineData,
        lineColorList: this.props.lineColorList,
        // drawPath:null,
    };

    componentDidUpdate(nextProps, nextState, snapshot) {
        console.log(this.props.lineData, 'this.props.linedata in main chart viz');
        console.log(nextProps.lineData, 'prevprops.linedata in main chart viz');
        if (!this.state.lineData) {
            this.setState({
                lineColorList: ['#FFFFFF'],
                lineData: [{
                    "Timestamp": "0",
                    "Data Values": 0
                }],
            })
        } // error prevention
        if (this.props.lineData !== nextProps.lineData) {
            this.setState({
                lineData: this.props.lineData,
                lineColorList: this.props.lineColorList,
            }, () => {
                console.log(this.state.lineData, 'this.state.lineData in componentDidUpdate');
                console.log(this.state.lineColorList, 'this.state.lineColorlist in componentDidUpdate');

            });
        }
    }

    render() {
        if (!this.state.lineData) return null;
        var allFields = Object.keys(this.state.lineData[0]);
        var firstCol = allFields[0]; //gives the column name of the first column, which is the string "Timestamp"
        var numCol = allFields.length; //gives the total number of columns in the lineData, including the first non-lineData column
        var sliced = allFields.slice(1, numCol); //gives all the column names of lineData, excluding the first column
        return (
            <div>
                <LineChart width={750} height={460} data={this.state.lineData}
                           margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                    {/*<CartesianGrid strokeDasharray="3 3"/>*/}
                    <XAxis dataKey={firstCol} tick={true}/>
                    <YAxis/>
                    <Legend/>
                    {/*<Tooltip/>*/}
                    {
                        (sliced.map((seqLength, i) => (<Line dot={false} type='monotone' dataKey={sliced[i]}
                                                             stroke={this.state.lineColorList[i]}/>)))
                    }
                    <Brush/>
                </LineChart>
            </div>
        );
    }
}
