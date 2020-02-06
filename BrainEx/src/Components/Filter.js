import React from 'react';
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";
import Title from "./Title";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';


function preventDefault(event) {
    event.preventDefault();
}

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


function valuetext(value) {
    return `${value}milisecond`;
}

export default function Filter() {
    const classes = useStyles();
    //range slider
    const [value, setValue] = React.useState([20, 37]);
    //overlap percentage default
    const [values, setValues] = React.useState({
        percentage: '40',
    });

    const handleChange = prop => event => {
        // setState({ ...state, [name]: event.target.checked });
        setValues({...values, [prop]: event.target.value});
    };

    const handleRangeChange = (event, newValue) => {
        setValue(newValue);
    };


    const handleSliderChangeStart = (event, newValue) => {
        setValue(newValue);
    };
    const handleSliderChangeEnd = (event, newValue) => {
        setValue(newValue);
    };

    const handleInputChangeStart = event => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };
    const handleInputChangeEnd = event => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 100) {
            setValue(100);
        }
    };

    return (
        <React.Fragment>
            <React.Fragment>
                <Title>Filter</Title>
                <Divider/>
                <form className={classes.root} noValidate autoComplete="off">
                    <FormControl component="fieldset">
                        <FormGroup>
                            <Typography id="range-slider" gutterBottom>
                                Length of interest of sequence matches
                            </Typography>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <Input
                                        className={classes.input}
                                        value={value}
                                        margin="dense"
                                        onChange={handleInputChangeStart}
                                        onBlur={handleBlur}
                                        inputProps={{
                                            step: 10,
                                            min: 0,
                                            max: 100,
                                            type: 'number',
                                            'aria-labelledby': 'input-slider',
                                        }}
                                    />
                                </Grid>
                                <Grid item xs>
                                    {/*<Slider*/}
                                    {/*    // value={typeof value === 'number' ? value : 0}*/}
                                    {/*    onChange={handleSliderChangeEnd}*/}
                                    {/*    aria-labelledby="input-slider"*/}
                                    {/*/>*/}

                                    <Slider
                                        // value={value}
                                        value={value}
                                        onChange={handleRangeChange}
                                        valueLabelDisplay="auto"
                                        aria-labelledby="range-slider"
                                        getAriaValueText={valuetext}
                                    />
                                </Grid>
                                <Grid item>
                                    <Input
                                        className={classes.input}
                                        value={value}
                                        margin="dense"
                                        onChange={handleInputChangeEnd}
                                        onBlur={handleBlur}
                                        valueLabelDisplay="auto"
                                        inputProps={{
                                            step: 10,
                                            min: 0,
                                            max: 100,
                                            type: 'number',
                                            'aria-labelledby': 'input-slider',
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            <TextField
                                required
                                id="outlined-number"
                                label="Number of best sequence matches"
                                placeholder="5"
                                multiline
                                type="number"
                                size="small"
                                variant="filled"
                                // InputLabelProps={{
                                //     shrink: true,
                                // }}
                            />
                            <TextField
                                required
                                variant="filled"
                                label="Overlap of sequence allowed"
                                id="overlap-percentage"
                                size="small"
                                placeholder="40"
                                className={clsx(classes.margin, classes.textField)}
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                }}
                            />

                            <FormControlLabel
                                value="checkBox"
                                control={<Checkbox color="primary"/>}
                                label="Exclude subsequence matches from current sequence"
                                labelPlacement="end"
                            />


                        </FormGroup>
                    </FormControl>
                </form>
                <div className={classes.root}>
                    <ButtonGroup>
                        <Button size="medium" variant="contained" color="primary">
                            Apply
                        </Button>
                        <Button size="medium" variant="contained" color="default">
                            Clear
                        </Button>
                    </ButtonGroup>
                </div>
            </React.Fragment>
        </React.Fragment>
    );
}