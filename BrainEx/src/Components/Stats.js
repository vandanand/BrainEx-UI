import React from 'react';
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";
import Title from "./Title";
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});


/*function preventDefault(event) {
    event.preventDefault();
}*/


export default function Stats() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>Statistics</Title>
            <Divider/>
            <List aria-label="primary">
                <ListItem>
                    <ListItemText primary="Mean" color="textPrimary"/>
                    <Typography color="textSecondary">3.52</Typography>
                </ListItem>
                <ListItem>
                    <ListItemText primary="Mode"/>
                    <Typography color="textSecondary">4.67</Typography>
                </ListItem>
            </List>
        </React.Fragment>
    );
}