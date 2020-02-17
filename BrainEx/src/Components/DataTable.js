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

// initialize list of checkbox values to be all true, same number of items as rows in data
const initializeCheckboxValues = (data) => {
    console.log("calling initialize checkboxes");
    let numCheckboxes = data.length;
    // create list of checkbox values (initialized to true)
    let checkbox_values = []; // value to be stored in showSequence (the state values are true/false)
    for (let i=0; i<numCheckboxes; i++) {
        checkbox_values.push({id: i, isChecked: true});
    }
    console.log(checkbox_values);
    return checkbox_values;
};

export default function DataTable() {

    useEffect(() => {
        // todo @Kyra in useEffects, pull in the data from the API for initial pull, updating requires some extra thought I have to look into
    });

    const classes = useStyles();
    // setData should not be used unless we expect some sort of update while the user is looking at the data
    const [showSequence, setShowSequence] = useState(initializeCheckboxValues(query_results_dd)); // list of ids and isChecked t/f json's
    const [checkboxes, setCheckboxVal] = useState(initializeCheckboxes(query_results_dd));
    const [data, setData] = useState(createTable(query_results_dd));

    function initializeCheckboxes(data) {
        const handleCheckboxChange = (e, i) => {
            console.log("e");
            console.log(e);
            console.log("e.target");
            console.log(e.target);
            console.log("e.target.checked");
            console.log(e.target.checked);
            console.log("e.currentTarget");
            console.log(e.currentTarget);
            console.log("e.currentTarget.checked");
            console.log(e.currentTarget.checked);
            let newValues = showSequence;
            console.log("showSequence:");
            console.log(showSequence);
            newValues[i] = e.target.checked;
            console.log("newValues:");
            console.log(newValues);
            setShowSequence(newValues);
        };
        let checkboxes = [];
        let numCheckboxes = data.length;
        for (let i=0; i<numCheckboxes; i++) {
            console.log("we are in the checkbox loop");
            let checkbox = <Checkbox id={i} key={i} checked={showSequence[i]} onChange={handleCheckboxChange(i)}/>;
            let length = checkboxes.push(checkbox);
            console.log("checkboxes length: " + length);
        }
        console.log(checkboxes);
        return checkboxes;
    }

    // function to create the data table content using an external source (in this case, a constant from another file)
    function createTable(data) {
        const table = [];
        let colors = generateColors(data.length, top_color, bottom_color);
        data.map( (row, index) => {
            // todo add checkbox functionality here
            // todo should id of checkbox be index or row.id?
            // todo for the state value of this checkbox have an array of true/false and reference it by index when updating/displaying
            let length = table.push(createData(row.id, checkboxes[index], colors[index], row.subjectID, row.eventName, row.channelNum, row.startTime, row.endTime));
            console.log("table length: " + length);
        });
        console.log(table);
        return table;
    }

    return (
        <React.Fragment>
            <Title>Data Table</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Show</TableCell>
                        {/*<TableCell>Color</TableCell>*/}
                        <TableCell>Subject ID</TableCell>
                        <TableCell>Event Name</TableCell>
                        <TableCell>Channel Number</TableCell>
                        <TableCell>Start Time</TableCell>
                        <TableCell>End Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(row => (
                        <TableRow key={row.id}>
                            <TableCell style={{backgroundColor: "#" + row.color}}>{row.toggle}</TableCell>
                            <TableCell>{row.subjectID}</TableCell>
                            <TableCell>{row.eventName}</TableCell>
                            <TableCell>{row.channelNum}</TableCell>
                            <TableCell>{row.startTime}</TableCell>
                            <TableCell>{row.endTime}</TableCell>
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
