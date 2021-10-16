import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import HomeUsuario from './pages/homeUsuario';


function Routes() {

    return (

        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/home-usuario" exact component={HomeUsuario}/>
        </Switch>

    )

}


export default Routes;