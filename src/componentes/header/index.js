import React, {useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
// import api from '../../services/api';

function Header() {

    function logout(){
        console.log('logout')

    }

    return (
        <>
         <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">EWALLY</Navbar.Brand>
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
}

export default Header;