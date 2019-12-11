import React from "react";
import './BuildOptions.css';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import logo from "../brain.png";


const buildOptions = () => (
        <Container className="container" style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', width: '100%' }}>
            <div style={{backgroundColor: '#3C99DC', width: '100%', height: '17%', position: 'absolute', left:'0.01%', top:'0%'}}>
                <img src={logo} className="App-logo" alt="logo"/>
                <h1 className="App-title">BrainEx</h1>
                <h3 className="App-Version">Version 1.0.0</h3>
                <h4 className="options">Preprocessing Options</h4>
            </div>

            <label htmlFor="dropdown" style={{position:'absolute', left:'45%', top:'22%'}}>Distance Type</label>
            <div className="dropdown" style={{position:'absolute', left:'41.5%', top:'27%'}}>
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

            <Button className="distHelp" style={{position:'absolute', left:'75%', top:'28%', borderColor: 'black', backgroundColor:'#0F5298'}}>?</Button>

            <form>
                <div className="form-group" style={{width: '40%', position:'absolute', left:'30%', top:'42%'}}>
                    <label htmlFor="formControlRange">Similarity Threshold</label>
                    <input type="range" className="form-control-range" id="formControlRange"/>
                </div>
            </form>

            <Button className="simHelp" style={{position:'absolute', left:'75%', top:'43%', borderColor: 'black', backgroundColor:'#0F5298'}}>?</Button>

            <form>
                <div className="form-group" style={{width: '40%', position:'absolute', left:'30%', top:'60%'}}>
                    <label htmlFor="formControlRange">Length of Interest</label>
                    <input type="range" className="form-control-range" id="formControlRange"/>
                </div>
            </form>

            <Button className="lenHelp" style={{position:'absolute', left:'75%', top:'61%', borderColor: 'black', backgroundColor:'#0F5298'}}>?</Button>


            <Link to="/Components/BuildProgressMenu">
                <Button className="startprocess btn-primary" style={{width: '20%', borderColor: 'black', backgroundColor:'#0F5298'}}>Start Preprocessing</Button>
            </Link>

            <Container className="Box"> </Container>

            <Link to="/Components/csvViewer">
                <Button className="back btn-primary" style={{width: '12%', borderColor: 'black', backgroundColor:'#0F5298'}}>Back</Button>
            </Link>

        </Container>
    );


export default buildOptions;