import React, {Component, useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Checkbox from '@material-ui/core/Checkbox';
import Rainbow from 'rainbowvis.js/rainbowvis.js';
import {top_color, bottom_color} from '../data/default_values';
import TabledSeqThnl from "./TabledSeqThnl"; // thumbnail component

const useStyles = makeStyles(theme => ({
    // styles go here
}));

// generates x number of unique hex values between two given colors (generates a proportional gradient)
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
            checkboxValues: [],
            queryResults: [],
            allChecked: true
            // filteredData: this.createTable(query_results) // initially its all data
        };
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.initializeCheckboxValues = this.initializeCheckboxValues.bind(this);
        this.createTable = this.createTable.bind(this);
        this.selectAll = this.selectAll.bind(this);
        this.getTrueRows = this.getTrueRows.bind(this);
        this.createData = this.createData.bind(this);
    }

    componentDidUpdate(nextProps, nextState, snapshot) {
        // only update props if props have changed
        if (nextProps.queryResults !== this.props.queryResults) { // keep this because it prevents it from entering an infinite rerender loop
            this.setState({
                queryResults: (this.props.queryResults) ? this.createTable(this.props.queryResults) : [],
                checkboxValues: (this.props.queryResults) ? this.initializeCheckboxValues(this.props.queryResults) : []
            }, () => {
                console.log("queryResults received by DataTable");
                console.log(this.state.queryResults);
            });
        }
    }

    // return the data rows with "show" = true
    getTrueRows(data) {
        let filteredData = [];
        data.map((row, i) => {
            if (this.state.checkboxValues[i]) {
                filteredData.push(row);
            }
        });
        return filteredData;
    }

    // updates value of corresponding checkboxValue in state when toggled to be true/false
    handleCheckboxChange(index, event) {
        let newCheckboxVal = event.currentTarget.checked; // event value
        let newCheckboxValues = [...this.state.checkboxValues]; // shallow copy of state (prevents immutability)
        newCheckboxValues[index] = newCheckboxVal; // update value of checkbox
        let all_checked = newCheckboxValues.every((value) => value === true); // returns true if all values are true
        this.setState({
            checkboxValues: newCheckboxValues,
            // only update allChecked if the value has changed
            allChecked: (all_checked !== this.state.allChecked) ? all_checked : this.state.allChecked
        }, () => {
            console.log("updated in handle checkbox change to " + this.state.allChecked);
            // send new true data to ChartData through Dashboard
            let filteredData = this.getTrueRows(this.state.queryResults);
            this.props.sendData(filteredData);
        });
    }

    selectAll(event) {
        let newAllChecked = event.currentTarget.checked;
        // create new checkbox array of all newAllChecked values
        let newCheckboxValues = Array(this.state.checkboxValues.length).fill(newAllChecked);
        this.setState({
            checkboxValues: newCheckboxValues,
            allChecked: newAllChecked
        }, () => {
            console.log("checkboxes updated in selectAll to " + this.state.allChecked);
            // send new true data to ChartData through Dashboard
            let filteredData = this.getTrueRows(this.state.queryResults);
            this.props.sendData(filteredData);
        });
    }

    // initialize list of checkbox values to be all true, same number of items as rows in data
    initializeCheckboxValues(data) {
        let numCheckboxes = Object.keys(data).length;
        // create list of checkbox values (initialized to true)
        let checkbox_values = []; // value to be stored in showSequence (the state values are true/false)
        for (let i = 0; i < numCheckboxes; i++) {
            let length = checkbox_values.push(true);
        }
        return checkbox_values;
    }

    // creates a row of data
    createData(id, color, startTime, endTime, similarity, sequence) {
        return {id, color, startTime, endTime, similarity, sequence};
    }
    // function to create the data table content using an external source (in this case, a constant from another file)
    createTable(data) {
        let colors = generateColors(Object.keys(data).length, top_color, bottom_color);
        let numResults = Object.keys(data).length;
        let table = [];
        for (let i = 0; i < numResults; i++) {
            let result = data[i];
            let length = table.push(this.createData(result.ID, colors[i], result.start, result.end, result.similarity, result.data));
        }
        this.props.sendData(table);
        // this.props.sendData(colors);
        console.log('table', table);
        return table;
    }

    render() {
        return (
            <React.Fragment>
                <Title>Ranked Matching Sequences</Title>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Show
                                <Checkbox checked={this.state.allChecked} onChange={this.selectAll}/>
                            </TableCell>
                            {/*<TableCell>Color</TableCell>*/}
                            <TableCell>Sequence ID</TableCell>
                            <TableCell>Start Time</TableCell>
                            <TableCell>End Time</TableCell>
                            <TableCell>Similarity</TableCell>
                            <TableCell>Thumbnail</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(this.state.queryResults) ? (this.state.queryResults.map((row, i) => (
                            <TableRow key={row.id}>
                                <TableCell style={{backgroundColor: "#" + row.color}}>
                                    <Checkbox id={row.id} key={i} checked={this.state.checkboxValues[i]}
                                              onChange={(e) => this.handleCheckboxChange(i, e)}/>
                                </TableCell>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.startTime}</TableCell>
                                <TableCell>{row.endTime}</TableCell>
                                <TableCell>{row.similarity}</TableCell>
                                <TableCell><TabledSeqThnl data={row.sequence}/></TableCell>
                            </TableRow>
                        ))) : (
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        )}
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


