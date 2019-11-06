import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom'
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import Campaigns from './components/Campaigns'
import NewCampaign from './components/NewCampaign';
import * as serviceWorker from './serviceWorker';

const routing =  (
    <BrowserRouter>
        <div>
        <Switch>
          <Route exact path="/Campaigns" component={Campaigns} />
          <Route path="/campaigns/new" component={NewCampaign} />
        </Switch>
        </div>
    </BrowserRouter>
)
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
