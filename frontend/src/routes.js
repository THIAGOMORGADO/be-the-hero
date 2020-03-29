import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import NewIncident from './pages/NewIncidents'

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={login}/>
                <Route path="/register" component={Register}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/incidents/new" component={NewIncident}/> 
            </Switch>
        </BrowserRouter>
    );
}