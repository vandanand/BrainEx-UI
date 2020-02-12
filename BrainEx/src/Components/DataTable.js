import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Checkbox from '@material-ui/core/Checkbox';
import { query_results_dd } from "../data/query_results_dd";

// Generate Order Data
function createData(id, toggle, subjectID, eventName, channelNum, startTime, endTime) {
  return {id, toggle, subjectID, eventName, channelNum, startTime, endTime};
}

/*const rows = [
  createData(0, <Checkbox/>, '101-SART-June2018-AS', 'target correct', 'Channel-1 HbO', 126468, 167986
  ),
  createData(1, <Checkbox/>, '101-SART-June2018-AS', 'target correct', 'Channel-1 HbO', 274131, 315653
  )
];*/

// function to create the data table content using an external source (in this case, a constant from another file)
function createTable(data) {
  const table = [];
  data.map( (row) => {
    let length = table.push(createData(row.id, <Checkbox/>, row.subjectID, row.eventName, row.channelNum, row.startTime, row.endTime));
    // console.log("length: " + length);
  });
  console.log(table);
  return table;
}

/*function preventDefault(event) {
  event.preventDefault();
}*/

const useStyles = makeStyles(theme => ({
  // styles go here
}));

export default function DataTable() {
  const classes = useStyles();
  // setData should not be used unless we expect some sort of update while the user is looking at the data
  const [data, setData] = useState(createTable(query_results_dd));

  return (
      <React.Fragment>
        <Title>Data Table</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Show</TableCell>
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
                  <TableCell>{row.toggle}</TableCell>
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
