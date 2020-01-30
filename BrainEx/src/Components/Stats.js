import React from 'react';
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";
import Title from "./Title";
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';


function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function Stats() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <React.Fragment>
                <Title>Statistics</Title>
                <Divider/>
                <List component="nav" aria-label="primary">
                    <ListItem button>
                        <ListItemText primary="Mean"/>
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Mode"/>
                    </ListItem>
                </List>
            </React.Fragment>
        </React.Fragment>
    );
}
