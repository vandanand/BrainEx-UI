import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import BuildOptions from "./Components/BuildOptions";
import buildProgressMenu from "./Components/BuildProgressMenu";
import QueryFinder from "./Components/QueryFinder";
import Home from "./Components/Home";
import RawDataExplorer from "./Components/RawDataExplorer"
import ClusterExplorer from "./Components/ClusterExplorer";
import BrainExHeader from "./Components/BrainExHeader";
import SelectNewDataset from "./Components/SelectNewDataset";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <div>
                        <BrainExHeader/>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/SelectNewDataset" component={SelectNewDataset} />
                        <Route exact path="/BuildOptions" component={BuildOptions} />
                        <Route exact path="/BuildProgressMenu" component={buildProgressMenu} />
                        <Route exact path="/ExploreRawData" component={RawDataExplorer} />
                        <Route exact path="/ExploreClusters" component={ClusterExplorer} />
                        <Route exact path="/QueryFinder" component={QueryFinder} />
                    </div>
                </div>
            </Router>
        )

    }
}



export default App;
