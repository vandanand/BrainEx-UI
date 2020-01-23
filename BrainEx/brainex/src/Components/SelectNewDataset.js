import React, { Component } from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

// todo finish refactoring with responsive content
class SelectNewDataset extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return(
            <div>
                <div className="col-sm-4">
                    <div className="well">
                        <Card>
                            <div className="card-body">
                                <h5 className="card-title">Previously imported unpreprocessed CSV Files</h5>
                                <div className="scrollable" style={{overflowY: 'auto', maxHeight: '210px'}}>
                                    <Button style={{ borderColor: 'black', width: '100%', backgroundColor:'#0F5298'}}>Dataset1</Button>
                                    <p> </p>
                                    <Button style={{ borderColor: 'black', width: '100%', backgroundColor:'#0F5298'}}>Dataset2</Button>
                                    <p> </p>
                                    <Button style={{ borderColor: 'black', width: '100%', backgroundColor:'#0F5298'}}>Dataset3</Button>
                                    <p> </p>
                                    <Button style={{ borderColor: 'black', width: '100%', backgroundColor:'#0F5298'}}>Dataset4</Button>
                                    <p> </p>
                                    <Button style={{ borderColor: 'black', width: '100%', backgroundColor:'#0F5298'}}>Dataset5</Button>
                                    <p> </p>
                                    <Button style={{ borderColor: 'black', width: '100%', backgroundColor:'#0F5298'}}>Dataset6</Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
                <Link to="/">
                    <Button className="back btn-primary" style={{width: '10%', position: 'absolute', top: '90%', left: '33%', backgroundColor:'#0F5298', borderColor: 'black'}}>Back</Button>
                </Link>
                <Link to="/BuildOptions">
                    <Button className="nextbtn btn-primary" style={{width: '10%', position: 'absolute', top: '90%', left: '88%', backgroundColor:'#0F5298', borderColor: 'black'}}>Next</Button>
                </Link>
            </div>
        );
    }
}

export default SelectNewDataset;