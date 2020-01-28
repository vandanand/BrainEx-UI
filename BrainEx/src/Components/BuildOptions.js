import React from "react";
import './BuildOptions.css';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import logo from "../brain.png";

// todo refactor and make more dynamic, also use full page
const buildOptions = () => (
        <Container className="container" style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', width: '100%' }}>

            <label htmlFor="dropdown">Distance Type</label>
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Choose a Distance
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href=" ">Warped Euclidean</a>
                    <a className="dropdown-item" href=" ">Warped Manhattan</a>
                    <a className="dropdown-item" href=" ">Warped Minkowski</a>
                    <a className="dropdown-item" href=" ">Warped Chebyshev</a>
                </div>
            </div>

            <Button className="distHelp">?</Button>

            <form>
                <div className="form-group">
                    <label htmlFor="formControlRange">Similarity Threshold</label>
                    <input type="range" className="form-control-range" id="formControlRange"/>
                </div>
            </form>

            <Button className="simHelp">?</Button>

            <form>
                <div className="form-group">
                    <label htmlFor="formControlRange">Length of Interest</label>
                    <input type="range" className="form-control-range" id="formControlRange"/>
                </div>
            </form>

            <Button className="lenHelp">?</Button>


            <Link to="/BuildProgressMenu">
                <Button className="startprocess btn-primary">Start Preprocessing</Button>
            </Link>

            <Container className="Box"> </Container>

            <Link to="/SelectNewDataset">
                <Button className="back btn-primary">Back</Button>
            </Link>

        </Container>
    );


export default buildOptions;