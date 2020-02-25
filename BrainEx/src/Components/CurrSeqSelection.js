import React, {Component} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Title from "./Title";
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CurSeqChartViz from "./CurSeqChartViz.js";
import axios from 'axios';
import {withStyles} from "@material-ui/core/styles";
import {ResponsiveContainer} from 'recharts';
import {ThemeProvider, withTheme} from '@material-ui/styles';

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
    // input: {
    //     display: 'none',
    // }
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
            file:null,
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
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    let data = [];
                    const jsonObj = JSON.parse(response.data.sequenceJSON)
                    for (let key in Object.keys(jsonObj)) {
                        data.push(jsonObj[key])
                    }
                    this.setState({
                            channelValues: data,
                        }, () => {
                            console.log(response.data.sequenceJSON, 'sequenceJSON');
                        }
                    );
                } else {
                    console.log("Upload failure");
                }
            })
            .catch((error) => {
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
                    <CurSeqChartViz data={this.state.channelValues}/>
                    <input
                        //accept="text/csv/*"
                        // className={classes.input}
                        id="outlined-button-file"
                        type="file"
                        onChange={this.updateFile}
                    />
                    <label htmlFor="outlined-button-file">
                        <Button variant="outlined" component="span" size="small" startIcon={<CloudUploadIcon/>}
                                onClick={this.onClickHandler}>
                            Upload
                        </Button>
                    </label>
                </div>

            </React.Fragment>
        );
    }
}

export default CurrSeqSelection;
