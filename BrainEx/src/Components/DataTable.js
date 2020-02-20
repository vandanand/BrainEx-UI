import React, { useState, useEffect, Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Checkbox from '@material-ui/core/Checkbox';
import { query_results_dd } from "../data/query_results_dd";
import Rainbow from 'rainbowvis.js/rainbowvis.js';
import {top_color, bottom_color} from '../data/default_values';
import {create} from "d3-selection";

// creates a row of data
function createData(id, toggle, color, subjectID, eventName, channelNum, startTime, endTime) {
    return {id, toggle, color, subjectID, eventName, channelNum, startTime, endTime};
}

// generates x number of unique hex values
function generateColors(numColors, top_color, bottom_color) {
    let colors = [];
    let color_range = new Rainbow();
    color_range.setNumberRange(1, numColors);
    color_range.setSpectrum(top_color, bottom_color);
    for (let i=1; i <= numColors; i++) {
        colors.push(color_range.colorAt(i));
    }
    return colors;

    //// use below for non-query data tables
    /*let j = 360 / (numColors - 1); // distribute the colors evenly on the hue range
    let r = []; // hold the generated colors
    for (let i=0; i<numColors; i++)
    {
        // generate distinguishable hex colors using hsv and converting to hex
        r.push(convert.hsv.hex(j * i, 100, 100)); // you can also alternate the saturation and value for even more contrast between the colors
    }
    return r;*/
}

export default class DataTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checkboxValues: this.initializeCheckboxValues(query_results_dd),
            allChecked: true,
            allData: [],
            displayedData: []
        };
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.selectAll = this.selectAll.bind(this);
        this.createTable = this.createTable.bind(this);
        this.initializeCheckboxes = this.initializeCheckboxes.bind(this);
        this.initializeCheckboxValues = this.initializeCheckboxValues.bind(this);
    }

    componentDidMount() {
        this.setState({
            allData: this.createTable(query_results_dd),
            displayedData: this.createTable(query_results_dd)
        });
    }

    // initialize list of checkbox values to be all true, same number of items as rows in data
    initializeCheckboxValues = (data) => {
        // console.log("calling initialize checkboxes");
        let numCheckboxes = data.length;
        // create list of checkbox values (initialized to true)
        let checkbox_values = []; // value to be stored in showSequence (the state values are true/false)
        for (let i=0; i<numCheckboxes; i++) {
            checkbox_values.push(true);
        }
        // console.log("checkbox_values:");
        // console.log(checkbox_values);
        return checkbox_values;
    };

    initializeCheckboxes = (data) => {
        let checkboxes = [];
        let numCheckboxes = data.length;
        // setCheckboxValues(initializeCheckboxValues(data));
        for (let i=0; i<numCheckboxes; i++) {
            // console.log("we are in the checkbox loop");
            let checkbox = <Checkbox id={i} key={i} defaultChecked={true} ischecked={this.state.checkboxValues[i]} onChange={this.handleCheckboxChange(i)}/>;
            let length = checkboxes.push(checkbox);
            // console.log("checkboxes length: " + length);
        }
        // console.log("checkboxes:");
        // console.log(checkboxes);
        return checkboxes;
    };

    // function to create the data table content using an external source (in this case, a constant from another file)
    createTable = (data) => {
        const table = [];
        let colors = generateColors(data.length, top_color, bottom_color);
        // let checkboxes = this.initializeCheckboxes(data);
        data.map( (row, index) => {
            // todo add checkbox functionality here
            // todo should id of checkbox be index or row.id?
            // todo for the state value of this checkbox have an array of true/false and reference it by index when updating/displaying
            let length = table.push(createData(row.id, <Checkbox id={index} key={index} defaultChecked={true} ischecked={this.state.checkboxValues[index]} onChange={this.handleCheckboxChange(index)}/>, "#" + colors[index], row.subjectID, row.eventName, row.channelNum, row.startTime, row.endTime));
            // console.log("table length: " + length);
        });
        // console.log(table);
        return table;
    };

    handleCheckboxChange = (index) => {
        return function (event) {
            console.log(event.currentTarget);
            console.log("index: " + index);
            let newCheckboxVal = event.currentTarget.checked; // event value
            console.log(newCheckboxVal);
            // let newCheckboxValues = this.state.checkboxValues; // copy of state
            // newCheckboxValues[index] = newCheckboxVal; // update value of checkbox
            this.setState(prevState => ({
                checkboxValues: {
                    ...prevState.checkboxValues,
                    [prevState.checkboxValues[index]]: newCheckboxVal
                }
            }));
            console.log("updated in handleCheckbox:");
            console.log(this.state.checkboxValues);
        }
    };

    selectAll = (event) => {
        const newValue = event.currentTarget.checked;
        console.log(newValue);
        let newCheckboxes = this.state.checkboxValues;
        for (let i=0; i<this.state.allData.length; i++) {
            newCheckboxes[i] = newValue;
        }
        this.setState({
            checkboxValues: newCheckboxes,
            allChecked: newValue
        });
        console.log("updated in selectAll:");
        console.log(this.state.checkboxValues);
    };

    render() {
        return (
            <React.Fragment>
                <Title>Ranked Matching Sequences</Title>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Show Sequence
                                <Checkbox checked={this.state.allChecked} onChange={this.selectAll}/>
                            </TableCell>
                            {/*<TableCell>Color</TableCell>*/}
                            <TableCell>Subject ID</TableCell>
                            <TableCell>Event Name</TableCell>
                            <TableCell>Channel Number</TableCell>
                            <TableCell>Start Time</TableCell>
                            <TableCell>End Time</TableCell>
                            <TableCell>Distance</TableCell>
                            <TableCell>Thumbnail</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.displayedData.map(row => (
                            <TableRow key={row.id}>
                                <TableCell style={{backgroundColor: row.color}}>{row.toggle}</TableCell>
                                <TableCell>{row.subjectID}</TableCell>
                                <TableCell>{row.eventName}</TableCell>
                                <TableCell>{row.channelNum}</TableCell>
                                <TableCell>{row.startTime}</TableCell>
                                <TableCell>{row.endTime}</TableCell>
                                <TableCell>0%</TableCell>
                                <TableCell>thumbnail goes here</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {/*<div className={classes.seeMore}>*/}
                {/*  <Link color="primary" href="#" onClick={preventDefault}>*/}
                {/*    Show more sequences*/}
                {/*  </Link>*/}
                {/*</div>*/}
            </React.Fragment>
        );
    }

}
