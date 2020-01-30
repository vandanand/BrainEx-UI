import React from 'react';
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";
import Title from "./Title";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';


function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function Filter() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <React.Fragment>
                <Title>Filter</Title>
                <Divider/>
                <p>there should be a form here</p>
                <ButtonGroup>
                    <Button size="small" variant="contained" color="primary">
                        Apply
                    </Button>
                    <Button size="small" variant="contained" color="default">
                        Clear
                    </Button>
                </ButtonGroup>
            </React.Fragment>
        </React.Fragment>
    );
}