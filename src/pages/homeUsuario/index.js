import React, { useEffect, useState } from 'react';
import { Modal, Container, Row, Form, Col } from 'react-bootstrap';
import api from '../../service/api';
import SaldoConta from '../../componentes/saldo';
import * as Formatar from '../../configs/formatacao';
import DatePicker, { registerLocale } from "react-datepicker";
import { addDays} from 'date-fns';
import * as moment from 'moment'
// import "bootstrap/dist/css/bootstrap.min.css";

export default function HomeUsuario() {

    const saldo = SaldoConta();

    const [extrato, setExtrato] = useState([]);
    const [dataDe, setDataDe] = useState();
    const [dataAte, setDataAte] = useState();

    function verExtrato(event){
        event.preventDefault();
        console.log(dataDe)
        console.log(moment(new Date(dataDe)).format("YYYY-MM-DD"))
    }




    useEffect(( ) => {
        // async function extrato() {
        //     // event.preventDefault();
        //     ///account/statements
        //     await api.get('account/statements?initialDate=2015-01-01&finalDate=2021-10-30')
        //     .then((result) => {
        //         console.log(result.data)
    
        //     }).catch(err => {
        //         // window.location.href = '/';
        //     })
    
    
        // }


        // extrato();

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
        <Container className="mt-4 col-md-10 d-flex justify-content-center" style={{backgroundColor:'rgba(245,245,245)',border:'1px solid #dddddd', padding:'10px', borderRadius:'10px', marginBottom:'15px'}} >
              <form  onSubmit = {verExtrato} >
                <p className="" style={{fontSize:"1.30em"}}><strong >Escolha o periodo que deseja ver seu extrato:</strong></p>
                <Col >
                <Row >
                <div className="form-group col-md-5">
                  <label>Data Inicial:</label>
                  <br></br>
                  <DatePicker
                    className="form-control"
                    locale='pt-BR'
                    selected={dataDe}
                    required
                    dateFormat="yyyy-MM-dd"
                    // popperPlacement="down"
                    maxDate={addDays(new Date(), 0)}
                    onChange={date => setDataDe(date)}
                  />
                </div>
                <div className="form-group col-md-5">
                  <label>Data Final:</label>
                  <br></br>
                  <DatePicker
                    className="form-control"
                    locale='pt-BR'
                    selected={dataAte}
                    required
                    dateFormat="yyyy-MM-dd"
                    // popperPlacement="down"
                    maxDate={addDays(new Date(), 0)}
                    onChange={date => setDataAte(date)}
                  />
              </div>
              <div className="form-group col-md-2" style={{marginTop:'35px'}}>
                <button type="submit" className="btn btn-sm btn-success">Procurar</button>
              </div>
              </Row>
              </Col>
            </form>
          </Container>
        </>

    )



}