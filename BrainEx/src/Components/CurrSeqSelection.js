import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Title from "./Title";
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CurSeqLineChart from "./CurSeqLineChart";


function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
    input: {
        display: 'none',
    }
});

export default function CurrSeqSelection() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <div className={classes.root}>
                <Title>Current Sequence Selection</Title>
                <CurSeqLineChart/>
                <input
                    accept="text/csv/*"
                    className={classes.input}
                    id="outlined-button-file"
                    multiple
                    type="file"
                />
                <label htmlFor="outlined-button-file">
                    <Button variant="outlined" component="span" size="small" startIcon={<CloudUploadIcon/>}>
                        Upload
                    </Button>
                </label>
            </div>
        </React.Fragment>
    );
}


