import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Legend() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>Sequence Identifier</Title>
            {/*<Typography component="p" variant="h4">*/}
            {/*  $3,024.00*/}
            {/*</Typography>*/}
            {/*<Typography color="textSecondary" className={classes.depositContext}>*/}
            {/*  on 15 March, 2019*/}
            {/*</Typography>*/}
            {/*<div>*/}
            {/*  <Link color="primary" href="#" onClick={preventDefault}>*/}
            {/*    View balance*/}
            {/*  </Link>*/}
            {/*</div>*/}
        </React.Fragment>
    );
}
