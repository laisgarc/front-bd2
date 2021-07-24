import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './home';
import Produtos from './produtos';
import Secao from './secao';
import Header from '../components/header.js'

const Webpages = () => {
    return(
        <div>
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/" component= {Home} />
                    <Route path = "/produtos" component = {Produtos} />
                    <Route path = "/secoes" component = {Secao} />
                </Switch>
            </Router>
        </div>
    );
};export default Webpages;