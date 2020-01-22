import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Nav, NavDropdown } from "react-bootstrap";

class NavBar extends Component {

    render() {
        return(
            // TODO style navbar and integrate with header
            <div className="navbar">
                <ul className="navbar-nav mr-auto">
                    <li class="nav-item">
                        <Link className="dropdown-item" to="/">Home</Link>
                    </li>
                    <li class="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Explorer Pages
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link className="dropdown-item" to="/ExploreRawData">Explore Raw Data</Link>
                            <Link className="dropdown-item" to="/ExploreClusters">Explore Raw Data</Link>
                        </div>
                    </li>
                    <li class="nav-item">
                        <Link className="dropdown-item" to="/QueryFinder">Find Similar Sequences</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default NavBar;