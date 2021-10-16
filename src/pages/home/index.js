import React, { useState } from 'react';
import { Modal, Container, Row, Form } from 'react-bootstrap';
import api from '../../service/api';



export default function Home() {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    async function loginUser(event){
        event.preventDefault();
        console.log('logado')
        const data = {
            'username': user,
            'password': password
        };
        await api.post('user/login', data, {})
        .then((result) => {
            console.log(result.data.token)
            localStorage.setItem('token_ewally',result.data.token)
                window.location.href = '/home-usuario';
        }).catch(err => {
            window.location.href = '/';
        })
    }


    // async function loginConta(data) {
    //     setLoadingModal(true)
    //      await api.post('index.php?r=usuario/create-token', data, {})
    //     .then((result) => {
    //         if(result){
            
    //             localStorage.setItem('token',result.data)
    //             window.location.href = '/homeUsuario';
    //         }else{
    //             window.location.href = '/';
    //         }
    //     })
    // }

    return (
        <>
            <Container className=" col-sm-3 login-usuario" style={{padding:"20px", borderRadius:'10px', border:'1px solid #dddddd'}}>
                <form onSubmit = {loginUser}>
                    <div className="form-group">
                        <label>Nome Usuário</label>
                        <input
                            className="form-control" 
                            id="user"
                            value={user}
                            onChange={event => setUser(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            className="form-control" 
                            id="password"
                            type="password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                    </div>
                        <button style={{ marginTop:'15px'}} type="submit" className="btn btn-sm btn-success">Login</button>
                    
            </form>
            </Container>
        </>


    )



}