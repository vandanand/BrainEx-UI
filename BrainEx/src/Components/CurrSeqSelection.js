import React, {Component} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Title from "./Title";
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CurSeqChartViz from "./CurSeqChartViz";
import axios from 'axios';


var file = null;

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

function onChangeHandler(e) {
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

class CurrSeqSelection extends Component {
    state = {
        channelVals: [],
        // lineColor:[],
        file: 'jsonOutput', // city whose temperatures to show
    };

    componentDidMount() {
        Promise.all([
            fetch(`${process.env.PUBLIC_URL}/jsonOutput.json`),
            // fetch(`${process.env.PUBLIC_URL}/mainVizColor.json`)
        ]).then(responses => Promise.all(responses.map(resp => resp.json())))
            .then(([jsonOutput, mainVizColor]) => {
                // sf.forEach(day => day.date = new Date(day.date));
                // this.setState({channelVals: {sf, ny}});
                this.setState(
                    {channelVals: {jsonOutput}}
                );
            });

    }

    updateFile = (e) => {
        // this.setState({file: e.target.value});
        onChangeHandler();
        this.setState({file: 'file'});
    }

    render() {
        const data = this.state.channelVals[this.state.file];
        return (
            <React.Fragment>
                {/*<div className={classes.root}>*/}
                <div>
                    <Title>Query Sequence</Title>
                    <CurSeqChartViz/>
                    <input
                        accept="text/csv/*"
                        // className={classes.input}
                        id="outlined-button-file"
                        multiple
                        type="file"
                        onChange={this.updateFile}
                    />
                    <label htmlFor="outlined-button-file">
                        <Button variant="outlined" component="span" size="small" startIcon={<CloudUploadIcon/>}
                                onClick={onClickHandler}>
                            Upload
                        </Button>
                    </label>
                    <CurSeqChartViz data={data}/>
                </div>
            </React.Fragment>
        );
    }
}

export default CurrSeqSelection;


//
// export default function CurrSeqSelection() {
//     const classes = useStyles();
//     return (
//         <React.Fragment>
//             <div className={classes.root}>
//                 <Title>Query Sequence</Title>
//                 <CurSeqChartViz/>
//                 <input
//                     accept="text/csv/*"
//                     className={classes.input}
//                     id="outlined-button-file"
//                     multiple
//                     type="file"
//                     onChange={onChangeHandler}
//                 />
//                 <label htmlFor="outlined-button-file">
//                     <Button variant="outlined" component="span" size="small" startIcon={<CloudUploadIcon/>} onClick={onClickHandler} >
//                         Upload
//                     </Button>
//                 </label>
//             </div>
//         </React.Fragment>
//     );
// }
