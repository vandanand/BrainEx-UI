import React, {Component} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Title from "./Title";
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CurSeqChartViz from "./CurSeqChartViz.js";
import axios from 'axios';
import {withStyles} from "@material-ui/core/styles";
import ReChart from "./ReChart";
import {ResponsiveContainer} from 'recharts';
import {ThemeProvider, withTheme} from '@material-ui/styles';

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
    input: {
        display: 'none',
    }
});


function preventDefault(event) {
    event.preventDefault();
}

class CurrSeqSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            channelValues: [],
            // lineColor:[],
            file: 'jsonOutput' // city whose temperatures to show
        };
        this.updateFile = this.updateFile.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }


    onClickHandler = (e) => {
        e.preventDefault(); // prevents page refresh on submit
        /* create form data object and append files to be uploaded onto it*/
        let file_form = new FormData();
        this.state.file.map((file) => {
            file_form.append("sequence_file", file); // add upload_files to FormData object
        });
        // Hook up to Kyra's server
        axios.post('http://localhost:5000/uploadSequence', file_form)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    updateFile = (e) => {
        // this.setState({file: e.target.value});
        this.setState({file: [...e.target.files]});
    };

    render() {
        const data = this.state.channelValues[this.state.file];
        return (
            <React.Fragment>
                <div
                    // className={classes.root}
                >
                    <Title>Query Sequence</Title>
                    <CurSeqChartViz/>
                    {/*<ReChart/>*/}
                    <input
                        //accept="text/csv/*"
                        // className={classes.input}
                        id="outlined-button-file"
                        type="file"
                        //TODO: We need to restrict file type
                        onChange={this.updateFile}
                    />
                    <label htmlFor="outlined-button-file">
                        <Button variant="outlined" component="span" size="small" startIcon={<CloudUploadIcon/>}
                                onClick={this.onClickHandler}>
                            Upload
                        </Button>
                    </label>
                    {/*<CurSeqChartViz data={data}/>*/}
                </div>

            </React.Fragment>
        );
    }
}

export default CurrSeqSelection;
