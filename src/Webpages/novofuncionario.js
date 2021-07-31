import React, { Component } from 'react';
import api from "../services/api.js";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { LinkContainer } from 'react-router-bootstrap';

class NovoFuncionario extends Component {
  state = {
    nome: '',
    sobrenome: '',
    cargo: '',
    idSuper: 0,
    data_admissao: '',
    cpf: '',
    enviado: false,
    resposta: '',
    salario: 'R$ 00,00',
    erro: false
  }

  sendFunc = (e) => {
    e.preventDefault();
    api.post("/insert/clt", {
      nome: this.state.nome,
      sobrenome: this.state.sobrenome,
      cargo: this.state.cargo,
      supervisor_id: this.state.idSuper,
      data_admissao: this.state.data_admissao,
      franquia_id: 1,
      cpf: this.state.cpf,
      salario: this.state.salario
    }).then((response) =>
      this.setState({
        enviado: true,
        resposta: response,
        erro: false
      })
    ).catch((err) => {
      console.error("ops! ocorreu um erro" + err);
      this.setState({
        enviado: false,
        resposta: err,
        erro: true
      })
    })
  }
  
  handleValor = e => {
    this.setState({
      salario: "R$ "+ e.target.value
    })
  }

  handleNome = event => {
    this.setState({
      nome: event.target.value
    })
  }

  handleSobrenome = event => {
    this.setState({
      sobrenome: event.target.value
    })
  }

  handleCargo = event => {
    this.setState({
      cargo: event.target.value
    })
  }

  handleId = event => {
    this.setState({
      idSuper: parseInt(event.target.value)
    })
  }

  handleData = event => {
    this.setState({
      data_admissao: event.target.value
    })
  }

  handleCPF = event => {
    this.setState({
      cpf: event.target.value
    })
  }

  render() {
    return(
      <div>
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
            <h1 style={{width: '90vw'}}>Inserir novo funcionário</h1>
          </div>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
          {(this.state.enviado && !this.state.erro) && 
            <div>
              <Card style={{ width: '90vw' }}>
                <Card.Body>
                  <Card.Title>Seu funcionário foi adicionado!</Card.Title>
                  <Card.Text>
                    Nome: {this.state.nome} {this.state.sobrenome} <br />
                    {this.state.cargo}
                  </Card.Text>
                  <LinkContainer to="/funcionarios">
                    <Card.Link>Ver todos os funcionários</Card.Link>
                  </LinkContainer>
                </Card.Body>
              </Card>
            </div>
          }
          {!this.state.enviado && 
            <Form onSubmit = {this.sendFunc} style={{width: '90vw', border: '1px solid rgba(0,0,0,.125)', padding: '1rem 1rem', borderRadius: '.25rem'}} >
              <Container style={{padding: '0', margin: 'auto 0'}}>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="valor">
                      <Form.Label>Nome</Form.Label>
                      <Form.Control type="text" placeholder="Nome" onChange={this.handleNome}/>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="valor">
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
                  <Col>
                    <Form.Group>
                      <Form.Label>Cargo</Form.Label>
                      <Form.Control type="text" placeholder="Cargo" onChange={this.handleCargo}/>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Salário</Form.Label>
                      <Form.Control type="text" placeholder="00,00" onChange={this.handleValor}/>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Form.Group>
                    <Form.Label>Supervisor</Form.Label>
                    <Form.Control type="number" placeholder="ID do supervisor" onChange={this.handleId}/>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group>
                    <Form.Label>Data de admissão</Form.Label>
                    <Form.Control type="text" placeholder="aaaa-mm-dd" onChange={this.handleData}/>
                  </Form.Group>
                </Row>
              </Container>
              <Button variant="primary" type="submit" style={{marginTop: '15px'}}>
                Enviar
              </Button>
            </Form>
          }
        </div>
      </div>
    )
  }
}

export default NovoFuncionario;