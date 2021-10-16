import React, { useEffect, useState } from 'react';
import { Container, Row, Col,Button, Accordion, Card} from 'react-bootstrap';
import api from '../../service/api';
import SaldoConta from '../../componentes/saldo';
import * as Formatar from '../../configs/formatacao';
import DatePicker, { registerLocale } from "react-datepicker";
import { addDays} from 'date-fns';
import * as moment from 'moment'
import ReactPagination from "react-js-pagination";
import * as Icon from 'react-bootstrap-icons';
// import "bootstrap/dist/css/bootstrap.min.css";

export default function HomeUsuario() {

  document.title = 'EWALLY'

    const saldo = SaldoConta();

    const [extratos, setExtratos] = useState([]);
    const [dataDe, setDataDe] = useState();
    const [dataAte, setDataAte] = useState();
    const [showExtrato, setShowExtrato] = useState(false);
    const [sliceExtrato, setSliceExtrato] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [numeroRegistros, setNumeroRegistros] = useState(0);

    function handlePageChange(number){
      let array_slice=[];
  
      extratos.map(extrato=>(
          array_slice.push(extrato)
      ))
  
        setActivePage(number)
        let number1 = (number-1)*10
        let number2 = (number*10)
        setSliceExtrato(array_slice.slice(number1,number2))
    }

    async function verExtrato(event){
        event.preventDefault();
        // console.log(dataDe)
        // console.log(moment(new Date(dataDe)).format("YYYY-MM-DD"))
        // event.preventDefault();
        ///account/statements
        // await api.get('account/statements?initialDate='+dataDe+'&finalDate='+dataAte)
        await api.get('account/statements?initialDate=2019-01-01&finalDate=2019-01-31')
        .then((result) => {
          if(result.data.statement.length === 0){
            alert('Não foi encontrado nenhum lançamento no período selecionado')
            setShowExtrato(false)
          }else{
            // setExtratos(result.data.statement)
            var i = 0;
            result.data.statement.map(dados=>(
                i++
            ))
            
            let array_slice_aux=[];
            result.data.statement.map(dados=>(
                array_slice_aux.push(dados)
            ))

            setActivePage(1)
            let number1_aux = 0
            let number2_aux = 10
            setSliceExtrato(array_slice_aux.slice(number1_aux,number2_aux))
            setNumeroRegistros(i);

            setShowExtrato(true);
            setExtratos(result.data.statement)
          }
            // 
    
        }).catch(err => {
          console.log(err);
            // window.location.href = '/';
        })
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
          {showExtrato &&
            <Container className="mt-4 col-md-12">
            <div className="card mt-5 mb-5">
                {sliceExtrato.map(extrato=>(
                    <Accordion className="mt-2 mb-2 col-12" key={extrato.id} >
                       <Card >
                       <Card.Header style={{ fontSize: '1.00em', padding:'0px' }}>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                    <Icon.Plus style={{ fontSize: '1.65em' }} />
                                </Accordion.Toggle>
                                &nbsp; <strong><i>Conta: </i></strong>&nbsp; {extrato.accountName}
                                <strong><i> &nbsp; Valor: </i></strong> &nbsp; {Formatar.formatarMoeda(extrato.amount/100)}
                                <strong><i> &nbsp; Saldo: </i></strong> &nbsp; {Formatar.formatarMoeda(extrato.balance/100)}
                                <strong><i> &nbsp; Data: </i></strong> &nbsp; {moment(new Date(extrato.createdAt)).format("DD/MM/YYYY")}
                                <strong><i> &nbsp; Tipo: </i></strong> &nbsp; {extrato.operationType}
                                <strong><i> &nbsp; Status: </i></strong> &nbsp; {extrato.status}
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    {/* <strong>Dados do Cedente:</strong>
                                    <br></br>
                                    <br></br>
                                    <strong>Nome: </strong>{boleto.cedente_nome} &nbsp; <strong>Agencia: </strong>{boleto.agencia} &nbsp; <strong>Conta: </strong>{boleto.conta}-{boleto.conta_id} &nbsp; <strong>Carteira: </strong>{boleto.carteira}
                                    <br></br>
                                    <strong>Uf: </strong>{boleto.cedente_uf}  &nbsp; <strong>Cidade: </strong>{boleto.cedente_cidade} &nbsp; <strong>CEP: </strong>{boleto.cedente_cep} &nbsp; <strong>Endereco: </strong>{boleto.cedente_endereco}
                                    <br></br>
                                    <hr></hr>
                                    <strong>Dados do Sacado:</strong>
                                    <br></br>
                                    <br></br>
                                    <strong>Nome: </strong>{boleto.sacado_nome}
                                    <br></br>
                                    <strong>Uf: </strong>{boleto.sacado_uf}  &nbsp; <strong>Cidade: </strong>{boleto.sacado_cidade} &nbsp; <strong>CEP: </strong>{boleto.sacado_cep} &nbsp; <strong>Endereco: </strong>{boleto.sacado_endereco}
                                    <br></br> */}
                                    {/* <strong><hr></hr></strong>
                                    <strong>Juros: </strong>{Formatar.formatarMoeda(boleto.juros)+' ao dia'} &nbsp; <strong>Multa: </strong>{Formatar.formatarMoeda(boleto.multa)} &nbsp; <strong>Desconto: </strong>{Formatar.formatarMoeda(boleto.valor_desconto)} &nbsp; <strong>Abatimento: </strong>{Formatar.formatarMoeda(boleto.valor_abatimento)} &nbsp; {boleto.data_limite_desconto && <strong>Data Limite do Desconto: </strong>}{Formatar.formatDateGerenciadorBoletos(boleto.data_limite_desconto)}
                                    <br></br>
                                     <strong>Data de Emissão: </strong>{Formatar.formatDateGerenciadorBoletos(boleto.data_emissao)} &nbsp; <strong>Nosso Número: </strong>{boleto.nosso_numero} &nbsp; <strong>Valor: </strong>{Formatar.formatarMoeda(boleto.valor)} */}
                                </Card.Body>
                            </Accordion.Collapse>
                         </Card>
                    </Accordion>
                ))}
                <div className="d-flex justify-content-center">
                <ReactPagination
                  itemClass="page-item"
                  linkClass="page-link"
                  hideNavigation
                  activePage={activePage}
                  itemsCountPerPage={10}
                  totalItemsCount={numeroRegistros}
                  pageRangeDisplayed={5}
                  onChange={handlePageChange.bind(this)}
                />
                </div>
            </div>
            
            </Container>

            }

        </>

    )



}