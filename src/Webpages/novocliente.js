import React, { Component } from 'react';
import api from "../services/api.js";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import ProgressBar from 'react-bootstrap/ProgressBar'
import {Link} from 'react-router-dom'

class NovoCliente extends Component {
  constructor() {
    super();
    this.myRef = React.createRef();
    let idURL = 0;
}


  state = {
    nome:'',
    cpf: '',
    celular: '',
    sobrenome: '',
    resposta: '',
    idCliente: 0,
    erro: false,
    addNovo: false,
    clientes: []
  }

  handleID = e => {
    this.setState(
      {idCliente: e.target.value}, () =>
      {console.log(this.state.idCliente)}
    )
  }

  handleNome = e => {
    this.setState({
      nome: e.target.value
    })
  }

  handleCPF = e => {
    this.setState({
      cpf: e.target.value
    })
  }
  
  handleCelular = e => {
    this.setState({
      celular: e.target.value
    })
  }
  
  handleSobrenome = e => {
    this.setState({
      sobrenome: e.target.value
    })
  }

  sendCliente = () => {
    console.log(this.state)
    api.post("/insert/cliente", {
      nome: this.state.nome,
      cpf: this.state.cpf,
      celular: this.state.celular,
      endereco: 1,
      sobrenome: this.state.sobrenome
    }).then((response) =>
      {this.setState({
        enviado: true,
        resposta: response,
        erro: false,
        addNovo: false
      })
      this.fetchClientes()
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

  handleNovo(){
    this.setState({
      addNovo: true
    })
  }

  fetchClientes() {
    api
    .get('/cliente')
    .then((response) => {
      this.setState({
        clientes: response.data
      })
    })
    .catch((err) => {
      console.error('ops! ocorreu um erro' + err);
    });
  }

  componentDidMount() {
    this.fetchClientes()
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
              <ProgressBar now={33.3} />
              <Form>
                <Form.Group style={{marginTop: '25px'}}>
                    <Form.Label>Selecionar cliente</Form.Label>
                    <Form.Control as="select" custom onChange={this.handleID} value={this.state.idCliente}>
                    <option>Clientes</option>
                    {this.state.clientes.map(cliente =>
                        <option value={cliente.cliente_id}>{cliente.nome_cli} {cliente.sobrenome_cli}</option>
                      )
                    }
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Button variant="primary" style={{marginTop: '15px'}} onClick={() => this.handleNovo()}>Adicionar Novo</Button>
                </Form.Group>
                {this.state.addNovo && 
                  <Form>
                    <Container style={{padding: '0', margin: 'auto 0'}}>
                      <Row>
                        <Col>
                          <Form.Group controlId="valor">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" placeholder="Nome" onChange={this.handleNome}/>
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group controlId="valor">
                            <Form.Label>Sobrenome</Form.Label>
                            <Form.Control type="text" placeholder="Nome" onChange={this.handleSobrenome}/>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Form.Group>
                          <Form.Label>CPF</Form.Label>
                          <Form.Control type="string" placeholder="Apenas números" onChange={this.handleCPF}/>
                        </Form.Group>
                      </Row>
                      <Row>
                        <Form.Group>
                          <Form.Label>Celular</Form.Label>
                          <Form.Control type="text" placeholder="Apenas números" onChange={this.handleCelular}/>
                        </Form.Group>
                      </Row>
                    </Container>
                    <Button variant="primary" onClick={() => this.sendCliente()} style={{marginTop: '15px'}}>
                      Adicionar Cliente
                    </Button>
                  </Form>
                }
                <Form.Group style={{marginTop: '15px'}}>
                    <Link to={{
                    pathname: "/venda/2",
                    search: "?cliente="+this.state.idCliente
                  }}
                  variant="primary" style={{marginTop: '15px'}}>
                    Avançar
                    </Link>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
          </div>
      </div>
    )
  }
}

export default NovoCliente;