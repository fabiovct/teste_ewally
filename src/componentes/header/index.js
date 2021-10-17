import React, {useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
// import api from '../../services/api';

function Header() {

    function logout() {
        localStorage.removeItem('token_ewally');
        window.location.href = '/';
    };

    // if (window.location.pathname === '/home-usuario'){

    return (
        <>
         <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">EWALLY</Navbar.Brand>
                {window.location.pathname !== '/' &&
            <button 
                type="button" 
                className="btn btn-danger btn-sm"
                onClick={() => logout()}
            >
                <Icon.BoxArrowRight style={{ fontSize: '1.65em' }} />
            </button>
            }
            </Container>

         </Navbar>
        {/* <nav className="navbar mb-2 header-component">
            <a className="link-home" href="/homeUsuario">Teste</a>
            <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => logout()}
            >Logout</button>
        </nav> */}
        </>
    )
    // }else{
    //     return (
    //         <>
    //         </>
    //     )

    // }
}

export default Header;