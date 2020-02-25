import React, {Component, useState, useEffect} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import DataTable from './DataTable';
import CurrSeqSelection from './CurrSeqSelection.js'
import Filter from './Filter.js'
import ChartData from './ChartData.js'
import Stats from './Stats.js'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="http://interaction.mystrikingly.com/#people/">
                Worcester Polytechnic Institute Interaction Lab
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    title: {
        flexGrow: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 530,
    }
}));

export default function Dashboard(props) {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [receivedData, setDataState] = useState(() => []);
    const [queryResults, setResults] = useState(() => {});
    // const [receivedData, setDataState] = useState(() => []);
    // const [lineCol,setLineColorState] = useState(()=>[]);

    useEffect(() => {
        console.log("parent received data!");
        console.log(receivedData);
    }, [receivedData]);

    useEffect(() => {
        console.log("parent received results!");
        console.log(queryResults);
    }, [queryResults]);

    function receiveData(tableData) {
        console.log("calling receiveData");
        setDataState(tableData);
    }

    function receiveResults(results) {
        console.log("calling receiveResults");
        console.log(results);
        setResults(results);
    }

    return (
        <div className={classes.root}>
            <main className={classes.content}>
                {/*<div className={classes.appBarSpacer}/>*/}
                <Container maxWidth='lg' className={classes.container}>
                    <Grid container spacing={2} direction="row" justify="center"
                          alignItems="flex-start">
                        <Grid item container spacing={2} direction="column" lg={4}>
                            {/* current sequence selection thumbnail */}
                            <Grid item lg={12}>
                                <Paper className={classes.paper}>
                                    <CurrSeqSelection/>
                                </Paper>
                            </Grid>
                            {/* filters */}
                            <Grid item lg={12}>
                                <Paper className={classes.paper}>
                                    <Filter sendResults={receiveResults} loi_min={props.loi_min} loi_max={props.loi_max}/>
                                </Paper>
                            </Grid>
                            {/*stats*/}
                            <Grid item lg={12}>
                                <Paper className={classes.paper}>
                                    <Stats/>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid item container spacing={2} direction="row" lg={8}>
                            <Grid item lg={12}>
                                {/* MainChart */}
                                <Paper className={fixedHeightPaper}>
                                    <ChartData data={receivedData}/>
                                </Paper>
                            </Grid>
                            <Grid item lg={12}>
                                {/* Table */}
                                <Paper className={fixedHeightPaper}>
                                    <DataTable queryResults={queryResults} sendData={receiveData}/>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                        <Copyright/>
                    </Box>
                </Container>
            </main>
        </div>
    );
}
