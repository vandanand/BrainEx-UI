import React , {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./NavBar";

class ExplorerPages extends Component {
    constructor(props) {
        super(props);
        this.state ={
            currentPath: "/QueryFinder"
        }
    }

    render() {

        //todo template
        //style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', width: '100%' }}
        return(
            <div >
                <NavBar currentPath={this.state.currentPath}/>
            </div>
        );
    }
}

export default ExplorerPages;