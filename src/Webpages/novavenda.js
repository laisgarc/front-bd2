import React, { Component } from 'react';
import api from "../services/api.js";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { LinkContainer } from 'react-router-bootstrap';

class NovaVenda extends Component {

  state = {
    valor:'',
    data: '',
    caixa: '',
    parcelas: 0,
    resposta: '',
    erro: false,
    funcionarios: [],
    clienteid: 0,
    idFuncionario: 0,
    idVenda: 0
  }

  handleID = e => {
    this.setState(
      {idFuncionario: parseInt(e.target.value)}, () =>
      {console.log(this.state.idFuncionario)}
    )
  }

  geturl = () => {
    var query = window.location.search.substring(1);
       var vars = query.split("?");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] === "cliente"){return parseInt(pair[1]);}
       }
       return(false);
  }

  handleCaixa = e => {
    this.setState({
      caixa: e.target.value
    })
  }

  handleParcelas = e => {
    this.setState({
      parcelas: parseInt(e.target.value)
    })
  }
  
  handleData = e => {
    this.setState({
      data: e.target.value
    })
  }
  
  handleValor = e => {
    this.setState({
      valor: "R$ "+ e.target.value
    })
  }

  irProx = (e) => {
    window.location.href = "/venda/3/?venda="+e;
  }

  sendVenda = (e) => {
    e.preventDefault();
    api.post("/insert/venda", {
      funcionario_id: this.state.idFuncionario,
      franquia_id: 1,
      cliente_id: this.state.clienteid,
      caixa: this.state.caixa,
      valor: this.state.valor,
      data: this.state.data,
      parcelas: this.state.parcelas
    }).then((response) =>
      {this.setState({
        enviado: true,
        idVenda: response.data.venda_id,
        erro: false,
        addNovo: false
      })
    }
    ).catch((err) => {
      console.error("ops! ocorreu um erro" + err);
      this.setState({
        enviado: false,
        resposta: err,
        erro: true
      })
    })
  }

  fetchFuncionarios() {
    api
    .get('/funcionario')
    .then((response) => {
      this.setState({
        funcionarios: response.data
      })
    })
    .catch((err) => {
      console.error('ops! ocorreu um erro' + err);
    });
  }

  componentDidMount() {
    var clientid = this.geturl();
    this.setState({
      clienteid: clientid
    });
    this.fetchFuncionarios();
  }

  render() {
    return(
      <div>
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
            <h1 style={{width: '90vw'}}>Inserir nova venda</h1>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
          <Card style={{width: '90vw', paddingTop: '0'}}>
            <Card.Body>
              {!this.state.enviado && 
              <>
              <ProgressBar now={66.6} />
              <Form >
                <Form.Group style={{marginTop: '25px'}} >
                  <Container style={{margin:0, padding: 0}}>
                    <Row>
                      <Col>
                        <Form.Label>Selecionar funcionário responsável</Form.Label>
                        <Form.Select custom onChange={this.handleID} >
                        <option>Funcionário</option>
                        {
                          this.state.funcionarios.map((funcionario) =>
                            <option value={funcionario.funcionario_id}>{funcionario.nome_func} {funcionario.sobrenome_func}</option>
                          )
                        }
                        </Form.Select>
                      </Col>
                      <Col>
                        <Form.Label>Número do caixa</Form.Label>
                        <Form.Control type="number" placeholder="Apenas números" onChange={this.handleCaixa}/>
                      </Col>
                    </Row>
                  </Container>
                </Form.Group>
                <Form.Group style={{marginTop: '15px'}}>
                  <Container style={{margin: 0, padding: 0}}>
                    <Row>
                      <Col>
                        <Form.Label>Valor</Form.Label>
                        <Form.Control type="text" placeholder="00,00" onChange={this.handleValor}/>
                      </Col>
                      <Col>
                        <Form.Label>Parcelas</Form.Label>
                        <Form.Control type="number" placeholder="Apenas números" onChange={this.handleParcelas}/>
                      </Col>
                    </Row>
                  </Container>
                </Form.Group>
                <Form.Group style={{marginTop: '15px'}}>
                  <Container style={{margin: 0, padding: 0}}>
                    <Row>
                      <Col>
                        <Form.Label>Data da venda</Form.Label>
                        <Form.Control type="text" placeholder="0000-00-00" onChange={this.handleData}/>
                      </Col>
                      <Col>
                      </Col>
                    </Row>
                  </Container>
                </Form.Group>
                <Button variant="primary" onClick={this.sendVenda} style={{marginTop: '15px'}}>
                Avançar
                </Button>
              </Form>
              </>
              }
              {(this.state.enviado && !this.state.erro) && 
                <div>
                  <ProgressBar now={100} />
                      <Card.Title>Sua venda foi adicionada!</Card.Title>
                      <Card.Text>
                        Caixa: {this.state.caixa} <br />
                        {this.state.valor}
                      </Card.Text>
                      <LinkContainer to="/vendas">
                        <Card.Link>Ver todas as vendas</Card.Link>
                      </LinkContainer>
                </div>
              }
            </Card.Body>
          </Card>
          </div>
      </div>
    )
  }
}

export default NovaVenda;