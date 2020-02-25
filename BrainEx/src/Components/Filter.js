import React, {useState,useEffect} from 'react';
import Divider from "@material-ui/core/Divider";
import Title from "./Title";
import clsx from 'clsx';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { makeStyles, Button, ButtonGroup, FormControl,
    FormGroup, FormControlLabel, Checkbox, Typography,
    Slider, Input, Grid, InputAdornment, TextField } from "@material-ui/core";
import axios from 'axios';

/*function preventDefault(event) {
    event.preventDefault();
}*/

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'center',
        '& .MuiTextField-root': {
            margin: theme.spacing(2),

        },
        padding: theme.spacing(1),
    },
    margin: {
        margin: theme.spacing(1),
    },
}));


export default function Filter(props) {
    const classes = useStyles();
    // range slider
    const [rangeVal, setRangeVal] = useState([props.loi_min, props.loi_max]);
    const [startVal, setStartVal] = useState(props.loi_min);
    const [endVal, setEndVal] = useState(props.loi_max);
    // establish constants for min and max
    // const MIN = props.loi_min;
    // const MAX = props.loi_max;
    //number of matches
    const [numMatches, setNumMatches] = useState(5);
    //overlap of sequences
    const [overlapVal, setOverlapVal] = useState(40);
    //exclude same id
    const [excludeID, setExcludeID] = useState(true);
    // query results
    const [queryResults, setQueryResults] = useState(null);

    useEffect(() => {
        console.log("results received");
        console.log(queryResults);
        props.sendResults(queryResults);
    }, [queryResults]);

    /*/!*update the range values for loi range*!/
    function handleRangeChange(event) {
        // console.log(event);
        const newRangeVal = event;
        setRangeVal(newRangeVal); // new value is stored in the event, not the newValue
        /!*update input values*!/
        const newStartVal = parseFloat(newRangeVal[0]);
        setStartVal(newStartVal);
        const newEndVal = parseFloat(newRangeVal[1]);
        setEndVal(newEndVal);
    }

    /!*update the input boxes for the loi range*!/
    const handleRangeChangeStart = event => {
        /!*get original range value*!/
        let newRangeVal = rangeVal;
        /!*update only the starting value*!/
        const newStartVal = parseFloat(event.target.value);
        setStartVal(newStartVal);
        // console.log("new start val: " + newStartVal);
        /!*update range value*!/
        newRangeVal[0] = newStartVal;
        setRangeVal(newRangeVal);
    };
    const handleRangeChangeEnd = event => {
        /!*get original range value*!/
        let newRangeVal = rangeVal;
        /!*update only the end value*!/
        const newEndVal = parseFloat(event.target.value);
        // console.log("new end val: " + newEndVal);
        setEndVal(newEndVal);
        /!*update range value*!/
        newRangeVal[1] = newEndVal;
        setRangeVal(newRangeVal);
    };*/

    const handleMatchChange = (e) => {
        console.log(e.target.value);
        setNumMatches(e.target.value);
    };

    const handleOverlapChange = (e) => {
        console.log(e.target.value);
        setOverlapVal(e.target.value);
    };

    const handleExcludeIDChange = (e) => {
        console.log(e.target.checked);
        setExcludeID(e.target.checked);
    };

    /*when apply is clicked, submit the form to the backend*/
    const handleQuery = (e) => {
        e.preventDefault(); // dont refresh the page on submit
        // let loi = rangeVal.toString();
        let best_matches = numMatches.toString();
        let overlap = (overlapVal/100).toString();
        let excludeS = excludeID.toString();
        let form = new FormData();
        // form.append("loi", loi);
        form.append("best_matches", best_matches);
        form.append("overlap", overlap);
        form.append("excludeS", excludeS);
        console.log(form);
        axios.post('http://localhost:5000/query', form)
        .then(function (response) {
          console.log(response.data['message']);
          setQueryResults(JSON.parse(response.data['resultJSON']));
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    return (
        <React.Fragment>
            <React.Fragment>
                <Title>Filter</Title>
                <Divider/>
                <form className={classes.root} noValidate autoComplete="off">
                    <FormControl component="fieldset">
                        <FormGroup>
                            {/*<Typography id="range-slider" gutterBottom>
                                Lengths of interest for matches
                            </Typography>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <Input
                                        className={classes.input}
                                        value={startVal}
                                        margin="dense"
                                        onChange={handleRangeChangeStart}
                                        // onBlur={handleBlur}
                                        inputProps={{
                                            step: 0.1,
                                            min: MIN,
                                            max: MAX,
                                            type: 'number',
                                            'aria-labelledby': 'input-slider',
                                        }}/>
                                </Grid>
                                <Grid item xs>
                                    <Range
                                        value={rangeVal}
                                        step={0.1}
                                        min={MIN}
                                        max={MAX}
                                        onChange={handleRangeChange}/>
                                </Grid>
                                <Grid item>
                                    <Input
                                        className={classes.input}
                                        value={endVal}
                                        margin="dense"
                                        onChange={handleRangeChangeEnd}
                                        // onBlur={handleBlur}
                                        valueLabelDisplay="auto"
                                        inputProps={{
                                            step: 0.1,
                                            min: MIN,
                                            max: MAX,
                                            type: 'number',
                                            'aria-labelledby': 'input-slider',
                                        }}/>
                                </Grid>
                            </Grid>*/}

                            {/* NUMBER OF MATCHES FIELD */}
                            <TextField
                                required
                                value={numMatches}
                                onChange={handleMatchChange}
                                id="outlined-number"
                                label="Number of best sequence matches"
                                placeholder="5"
                                // multiline
                                size="small"
                                variant="filled"
                                inputProps={{
                                    step: 1,
                                    min: 1,
                                    type: 'number'
                                }}/>
                                {/* OVERLAP FIELD */}
                            <TextField
                                required
                                value={overlapVal}
                                onChange={handleOverlapChange}
                                variant="filled"
                                label="Overlap of sequence allowed"
                                id="overlap-percentage"
                                size="small"
                                className={clsx(classes.margin, classes.textField)}
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                }}
                                inputProps={{
                                    min: 0,
                                    max: 100,
                                    type: 'number'
                                }}/>
                                {/* EXCLUDE SAME ID FIELD */}
                            <FormControlLabel
                                value="checkBox"
                                control={<Checkbox color="primary" checked={excludeID} onChange={handleExcludeIDChange}/>}
                                label="Exclude subsequence matches from current sequence"
                                labelPlacement="end"
                            />
                        </FormGroup>
                    </FormControl>
                    <div className={classes.root}>
                        <ButtonGroup>
                            <Button type="submit" size="medium" variant="contained" color="primary" onClick={handleQuery}>
                                Apply
                            </Button>
                            <Button size="medium" variant="contained" color="default">
                                Clear
                            </Button>
                        </ButtonGroup>
                    </div>
                </form>
            </React.Fragment>
        </React.Fragment>
    );
}
