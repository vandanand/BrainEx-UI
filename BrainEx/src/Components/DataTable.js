import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Checkbox from '@material-ui/core/Checkbox';

// Generate Order Data
function createData(id, toggle, subjectID, eventName, chanelNum, startTime, endTime) {
  return {id, toggle, subjectID, eventName, chanelNum, startTime, endTime};
}

const rows = [
  createData(0, <Checkbox/>, '101-SART-June2018-AS', 'target correct', 'Channel-1 HbO', 126468, 167986
  ),
  createData(1, <Checkbox/>, '101-SART-June2018-AS', 'target correct', 'Channel-1 HbO', 274131, 315653
  )
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
}));

export default function DataTable() {
  const classes = useStyles();
  return (
      <React.Fragment>
        <Title>Ranked Matching Sequences</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Show</TableCell>
              <TableCell>Subject ID</TableCell>
              <TableCell>Event Name</TableCell>
              <TableCell>Chanel Number</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.toggle}</TableCell>
                  <TableCell>{row.subjectID}</TableCell>
                  <TableCell>{row.eventName}</TableCell>
                  <TableCell>{row.chanelNum}</TableCell>
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
