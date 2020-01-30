import React from 'react';
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";
import Title from "./Title";


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
                <p>this does not make sense</p>
            </React.Fragment>
        </React.Fragment>
    );
}