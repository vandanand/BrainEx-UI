import React, { useState, useEffect } from 'react';
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

const useStyles = makeStyles(theme => ({
    // styles go here
}));

// creates a row of data
function createData(id, color, subjectID, eventName, channelNum, startTime, endTime) {
    return {id, color, subjectID, eventName, channelNum, startTime, endTime};
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

export default function DataTable() {
    const [checkboxValues, setCheckboxValues] = useState(() => initializeCheckboxValues(query_results_dd));
    const [tableData, setData] = useState(() => createTable(query_results_dd));
    // const [displayData, setDisplayData] = useState(() => allData);
    const [allChecked, setAllChecked] = useState(() => true);

    useEffect(() => {
        // actions on update of checkboxValues
        // todo PUT ANY THING TO DO WITH TRIGGERING ANYTHING AFTER CHECKBOXES CHANGE HERE
        /*uncheck show all if not all values are selected*/
        let all_checked = checkboxValues.every((value) => value);
        if (!all_checked) {
            setAllChecked(all_checked);
        }
        /*filtering data to send to server*/
        let filteredData = [];
        tableData.map((row, index) => {
            if (checkboxValues[index]) { // if the given row is checked
                let length = filteredData.push(row);
            }
        });
        console.log(filteredData);
        // send display data?
    }, [checkboxValues]);

    function handleCheckboxChange(index, event) {
        let newCheckboxVal = event.currentTarget.checked; // event value
        let newCheckboxValues = [...checkboxValues]; // shallow copy of state
        console.log("shallow copy of state:");
        console.log(newCheckboxValues);
        newCheckboxValues[index] = newCheckboxVal; // update value of checkbox
        setCheckboxValues(checkboxValues => newCheckboxValues); // set new state
    }

    function selectAll(event) {
        let newAllChecked = event.currentTarget.checked;
        let newCheckboxValues = Array(checkboxValues.length).fill(newAllChecked);
        console.log(newCheckboxValues);
        setAllChecked(newAllChecked);
        setCheckboxValues(newCheckboxValues);
    }

    // initialize list of checkbox values to be all true, same number of items as rows in data
    function initializeCheckboxValues(data) {
        // console.log("calling initialize checkbox values");
        let numCheckboxes = data.length;
        // create list of checkbox values (initialized to true)
        let checkbox_values = []; // value to be stored in showSequence (the state values are true/false)
        for (let i=0; i<numCheckboxes; i++) {
            let length = checkbox_values.push(true);
        }
        // console.log("checkbox_values:");
        // console.log(checkbox_values);
        return checkbox_values;
    }

    // function to create the data table content using an external source (in this case, a constant from another file)
    function createTable(data) {
        const table = [];
        let colors = generateColors(data.length, top_color, bottom_color);
        // let checkboxes = initializeCheckboxes(data);
        data.map( (row, index) => {
            // todo add checkbox functionality here
            // todo should id of checkbox be index or row.id?
            // todo for the state value of this checkbox have an array of true/false and reference it by index when updating/displaying
            let length = table.push(createData(row.id, colors[index], row.subjectID, row.eventName, row.channelNum, row.startTime, row.endTime));
            // console.log("table length: " + length);
        });
        // console.log(table);
        return table;
    }

    return (
        <React.Fragment>
            <Title>Ranked Matching Sequences</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Show
                            <Checkbox checked={allChecked} onChange={selectAll}/>
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
                    {tableData.map((row, i) => (
                        <TableRow key={row.id}>
                            <TableCell style={{backgroundColor: "#" + row.color}}>
                                <Checkbox id={row.id} key={i} checked={checkboxValues[i]} onChange={(e) => handleCheckboxChange(i,e)}/>
                            </TableCell>
                            <TableCell>{row.subjectID}</TableCell>
                            <TableCell>{row.eventName}</TableCell>
                            <TableCell>{row.channelNum}</TableCell>
                            <TableCell>{row.startTime}</TableCell>
                            <TableCell>{row.endTime}</TableCell>
                            <TableCell>0%</TableCell>
                            <TableCell>insert thumbnail here</TableCell>
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
