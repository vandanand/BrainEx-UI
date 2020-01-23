import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import csvViewer from './Components/csvViewer';
import BuildOptions from "./Components/BuildOptions";
import buildProgressMenu from "./Components/BuildProgressMenu";
// import ExplorerPages from "./Components/ExplorerPages";
import QueryFinder from "./Components/QueryFinder";
import Home from "./Components/Home";
import BrainExMain from "./Components/BrainExMain";
import RawDataExplorer from "./Components/RawDataExplorer"
import ClusterExplorer from "./Components/ClusterExplorer";
import BrainExHeader from "./Components/BrainExHeader";

class App extends Component {

    render() {
        return (
            <Router>
                <div className="App">
                    <div>
                        <BrainExHeader/>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/csvViewer" component={csvViewer} />
                        <Route exact path="/BuildOptions" component={BuildOptions} />
                        <Route exact path="/BuildProgressMenu" component={buildProgressMenu} />
                        {/*removing explorer pages because it should be a drop down*/}
                        {/*<Route exact path="/ExplorerPages" component={ExplorerPages} />*/}
                        <Route exact path="/BrainExMain" component={BrainExMain}/>
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
