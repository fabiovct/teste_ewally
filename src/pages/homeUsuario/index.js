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
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
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
    const [entradasGrafico, setEntradasGrafico] = useState([]);
    const [saidasGrafico, setSaidasGrafico] = useState([]);
    const [datasGrafico, setDatasGrafico] = useState([]);
    const options = {
      title: {
        text: 'Movimentações - Extrato'
      },
      chart: {
        type: 'bar'
      },
      xAxis: {
        categories: datasGrafico,
        title: {
            text: null
        }
      },
      series: [
        {
          color:'green',
          name: 'Entradas',
          data: entradasGrafico
        }, 
        {
            color:'red',
            name: 'Saidas',
            data: saidasGrafico
        }
      ]
    }


    // const [graficoExtrato]

    // const [teste, setTeste] = useState([]);


    function graficoExtrato(data){
      // let array_extrato_aux = [];

      const extrato_aux = data.reduce((obj, {createdAt, amount}) => {
        if (!obj[moment(new Date(createdAt)).format("DD/MM/YYYY")]) obj[moment(new Date(createdAt)).format("DD/MM/YYYY")] = [];
        obj[moment(new Date(createdAt)).format("DD/MM/YYYY")].push({'amount':amount,'data':moment(new Date(createdAt)).format("DD/MM/YYYY")});
        return obj;
      }, {});
      let array_datas_grafico = []
      let array_entradas_grafico = []
      let array_saidas_grafico = []

      Object.keys(extrato_aux).forEach(function(key) {
        let array_valor_entrada = 0;
        let array_valor_saida = 0;
        extrato_aux[key].map(e=>{
          // console.log('number',e.amount/100)).replace(',','.'))
          if(e.amount > 0){
            array_valor_entrada += Math.abs(e.amount)
          }else{
            array_valor_saida += Math.abs(e.amount)
          }
        })
        array_datas_grafico.push(key)
        array_entradas_grafico.push(array_valor_entrada/100)
        array_saidas_grafico.push(array_valor_saida/100)
        // entradasGrafico.push(12)
        console.log('datas',array_datas_grafico)
      });
      setDatasGrafico(array_datas_grafico)
      setEntradasGrafico(array_entradas_grafico)
      setSaidasGrafico(array_saidas_grafico)

      // extrato_aux.map(e=>(
      //   console.log(e)

      // ))
      
      // extratos.map(extrato=>(
      //   console.log(extrato)
      //   teste[extrato.createdAt].push()
        
      // ))

      

    }

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
            setNumeroRegistros(i)

            setShowExtrato(true)
            setExtratos(result.data.statement)
            graficoExtrato(result.data.statement)
          }
            // 
    
        }).catch(err => {
          console.log(err);
            // window.location.href = '/';
        })
    }

    function createMarkup(valor) {
      return {__html: valor};
    }
    
    function MyComponent(valor) {
      return <div dangerouslySetInnerHTML={createMarkup(valor)} />;
    }

    function colorStatus(valor){
      if(valor < 0){
        return 'red';
      }else{
        return 'green';
      }


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
        <Container className='mt-4'>
          <Col md={2}>
            <Card className="saldo-icones-home-usuario" style={{fontWeight:"bold"}}>
              <Row>
                <Col className="text-center"><Icon.Cash style={{fontSize:'30px'}}/></Col>
              </Row>
              <Row>
                <Col className="text-center">
                <span className="saldos-home span-saldos-home"> Saldo Conta</span>
                </Col>
              </Row>
              <Col className="text-center">
                <h5 className="saldos-home texto-saldos-home"><strong>{Formatar.formatarMoeda(saldo.balance/100)}</strong></h5>
              </Col>
          
            </Card>
          </Col>
            {/* <h1>{Formatar.formatarMoeda(saldo.balance/100)}</h1> */}

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
              <div className="form-group col-md-2" style={{marginTop:'25px'}}>
                <button type="submit" className="btn btn-sm btn-success"><Icon.Search style={{ fontSize: '1.65em' }} /></button>
              </div>
              </Row>
              </Col>
            </form>
          </Container>
          {showExtrato &&
          <>
            <Container className="mt-4 col-md-12" style={{padding:'1px'}}>
            <Row >
            <Col md={6} >
            <div className="card mt-5 mb-5">
              <HighchartsReact
                highcharts={Highcharts}
                options={options}
              />
            </div>
            
            </Col>
            <Col md={6} >
            <div className="card mt-5 mb-5">
                {sliceExtrato.map(extrato=>(
                    <Accordion className="mt-2 mb-2 col-12" key={extrato.id} defaultActiveKey="0" >
                       <Card >
                       <Card.Header style={{ fontSize: '1.00em', padding:'0px' }}>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0" >
                                    <Icon.ArrowDownCircle style={{ fontSize: '1.65em' }} />
                                </Accordion.Toggle>
                                {/* &nbsp; <strong><i>Conta: </i></strong>&nbsp; {extrato.accountName} */}
                                <strong><i> &nbsp; Valor: </i></strong> &nbsp; <i style={{color:colorStatus(extrato.amount)}}>{Formatar.formatarMoeda(extrato.amount/100)}</i>
                                {/* <strong><i> &nbsp; Saldo: </i></strong> &nbsp; {Formatar.formatarMoeda(extrato.balance/100)} */}
                                <strong><i> &nbsp; Data: </i></strong> &nbsp; <i>{moment(new Date(extrato.createdAt)).format("DD/MM/YYYY")}</i>
                                <strong><i> &nbsp; Tipo: </i></strong> &nbsp; <i>{extrato.operationType}</i>
                                {/* <strong><i> &nbsp; Status: </i></strong> &nbsp; {extrato.status} */}
                            </Card.Header>
                            {extrato.otherInfo &&
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                  {extrato.otherInfo.userLatitude &&
                                     <strong>Latitude:{extrato.otherInfo.userLatitude} &nbsp;&nbsp;</strong>

                                  }
                                  {extrato.otherInfo.userLongitude &&
                                     <strong>Longitude:{extrato.otherInfo.userLongitude} </strong>
                                  }
                                  {extrato.otherInfo.cupom &&
                                    <>
                                    <br></br>
                                    <strong>Cupom: </strong>
                                    {MyComponent((extrato.otherInfo.cupom.replace(/@@/g,'<br></br>').replace(/@/g,' ')))}
                                    
                                    </>
                                  }
                                </Card.Body>
                            </Accordion.Collapse>
                            }
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
            </Col>

            
            </Row>
            {/* <div className="mt-4 col-md-4">
            
            </div> */}
            
            </Container>
            </>

            }

        </>

    )



}