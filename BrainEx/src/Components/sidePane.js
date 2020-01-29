import React from 'react';
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import {mainListItems, secondaryListItems} from "./listItems";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({}));

export default function SidePane() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Divider/>
            <List>{mainListItems}</List>
            <Divider/>
            <List>{secondaryListItems}</List>
        </React.Fragment>
    );

}

