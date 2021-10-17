import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';
import api from './service/api';


export default function RouteWrapper({
    component: Component,
    isPrivate = false,
    isBloqued,
    ...rest
}){

    const [token, setToken] = useState();
      
      async function valida(){
        if(localStorage['token_ewally']){

          
        const data = {
            "token_ewally": localStorage['token_ewally'],
          };
        await api.get('account/balance',data ,{})
        .then(function(v){
        }).catch(err => {
            setToken(false)
              // window.location.href = '/';
        })
        }else{
            setToken(false)
        }
      }
      valida();

      const  signed = token;

      if((signed===false && isPrivate) || isBloqued===false){
          return window.location.pathname='/'
      }
      
    return <Route {...rest} component={Component} />

}


RouteWrapper.propTypes = {
    isPrivate: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
    isPrivate: false,
};



