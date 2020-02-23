import React, {Component, useState, useEffect} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import DataTable from './DataTable';
import CurrSeqSelection from './CurrSeqSelection.js'
import Filter from './Filter.js'
import ChartData from './ChartData.js'
import Stats from './Stats.js'
import ReCharts from './ReCharts.js'

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
        height: 525,
    }
}));

export default function Dashboard(props) {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [receivedData, setData] = useState(() => []);

    useEffect(() => {
        console.log("parent received info!");
        console.log(receivedData);
    });

    function receiveData(tableData) {
        console.log("calling receiveData");
        setData(tableData);
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
                                    <Filter loi_min={props.loi_min} loi_max={props.loi_max}/>
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
                                    <ChartData/>
                                </Paper>
                            </Grid>
                            <Grid item lg={12}>
                                {/* Table */}
                                <Paper className={fixedHeightPaper}>
                                    <DataTable sendData={receiveData}/>
                                </Paper>
                            </Grid>
                            {/*for testing purposes*/}
                            <Grid item lg={12}>
                                <Paper className={fixedHeightPaper}>
                                    <ReCharts/>
                                </Paper>
                            </Grid>
                            {/*for testing purposes ends here*/}
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
