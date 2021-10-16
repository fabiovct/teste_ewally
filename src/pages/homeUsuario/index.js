import React, { useEffect, useState } from 'react';
import { Modal, Container, Row, Form } from 'react-bootstrap';
import api from '../../service/api';
import SaldoConta from '../../componentes/saldo';
import * as Formatar from '../../configs/formatacao';

export default function HomeUsuario() {

    const saldo = SaldoConta();




    useEffect(( ) => {
        async function extrato() {
            // event.preventDefault();
            ///account/statements
            await api.get('account/statements?initialDate=2015-01-01&finalDate=2021-10-30')
            .then((result) => {
                console.log(result.data)
    
            }).catch(err => {
                // window.location.href = '/';
            })
    
    
        }


        extrato();

        // let saldo = SaldoConta()

        // setBalance(saldo.balance)
        // console.log(saldo)


    },
    []
    )


    return (
        <>
        <Container>
            <h1>{Formatar.formatarMoeda(saldo.balance/100)}</h1>
        </Container>
        </>

    )



}