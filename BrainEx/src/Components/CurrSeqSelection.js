import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Title from "./Title";
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CurSeqChartViz from "./CurSeqChartViz";
import axios from 'axios';

var file = null;

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

function onChangeHandler(e){
  file = e.target.files[0]
}

function onClickHandler(e) {
  e.preventDefault(); // prevents page refresh on submit
  /* create form data object and append files to be uploaded onto it*/
  let file_form = new FormData();
  file_form.append("sequence_file", file);
  // Hook up to Kyra's server
  axios.post('http://localhost:5000/uploadSequence', file_form)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

export default function CurrSeqSelection() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <div className={classes.root}>
                <Title>Query Sequence</Title>
                <CurSeqChartViz/>
                <input
                    accept="text/csv/*"
                    className={classes.input}
                    id="outlined-button-file"
                    multiple
                    type="file"
                    onChange={onChangeHandler}
                />
                <label htmlFor="outlined-button-file">
                    <Button variant="outlined" component="span" size="small" startIcon={<CloudUploadIcon/>} onClick={onClickHandler} >
                        Upload
                    </Button>
                </label>
            </div>
        </React.Fragment>
    );
}
