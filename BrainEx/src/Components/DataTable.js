import React from 'react';
import Link from '@material-ui/core/Link';
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
  createData(0, <Checkbox/>, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
  createData(1, <Checkbox/>, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••', 312.44)
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function DataTable() {
  const classes = useStyles();
  return (
      <React.Fragment>
        <Title>Sequence Table</Title>
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
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.shipTo}</TableCell>
                  <TableCell>{row.paymentMethod}</TableCell>
                  <TableCell>{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          Show more sequences
        </Link>
      </div>
    </React.Fragment>
  );
}
