import React , {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Title from "./Title";
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CurSeqLineChart from "./CurSeqLineChart";
import axios from 'axios';

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

    const [file, setFile] = useState(null);

    function onChangeHandler(e) {
        let newFile = e.currentTarget.files[0];
        setFile(newFile);
        console.log(file);
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

    return (
        <React.Fragment>
            <div className={classes.root}>
                <Title>Current Sequence Selection</Title>
                <CurSeqLineChart/>
                <input
                    accept="text/csv/*"
                    className={classes.input}
                    id="outlined-button-file"
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
