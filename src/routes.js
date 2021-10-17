import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import HomeUsuario from './pages/homeUsuario';
import notFoundPage from './pages/notFound';
import PrivateRoute from './rotasPrivadas'


function Routes() {

    return (

        <Switch>
            <Route path="/" exact component={Home}/>
            <PrivateRoute path="/home-usuario" isPrivate exact component={HomeUsuario}/>
            <PrivateRoute path = "*" component = {notFoundPage} isPrivate />
            {/* <Route path="/home-usuario" exact component={HomeUsuario}/> */}
        </Switch>

    )

}


export default Routes;