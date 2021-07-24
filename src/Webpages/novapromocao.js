import React, { Component } from 'react';
import api from "../services/api.js";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { LinkContainer } from 'react-router-bootstrap';

class NovaPromocao extends Component {
  state = {
    valor:'',
    id: '',
    enviado: false,
    resposta: '',
    erro: false
  }

  sendPromo = (e) => {
    e.preventDefault();
    api.post("/promocao", {
      porcentagem: this.state.valor,
      secaoId: this.state.id
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

  handleId = event => {
    this.setState({
      id: event.target.value
    })
  }

  handleValor = event => {
    this.setState({
      valor: event.target.value
    })
  }

  handleNovaPromo = event => {
    this.setState({
      valor:'',
      id: '',
      enviado: false,
      resposta: '',
      erro: false
    })
  }

  render() {
    return(
      <div>
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
            <h1 style={{width: '90vw'}}>Inserir nova promoção</h1>
          </div>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
          {(this.state.enviado && this.state.erro) && 
            <div>
              <Card style={{ width: '90vw' }}>
                <Card.Body>
                  <Card.Title>Aconteceu um erro! </Card.Title>
                  <Card.Text>
                    Mensagem de erro: {this.state.resposta} <br />
                    Por favor tente novamente.
                  </Card.Text>
                  <Card.Link onClick={this.handleNovaPromo} style={{cursor:'pointer'}}>Voltar</Card.Link>
                </Card.Body>
              </Card>
            </div>
          }
          {(this.state.enviado && !this.state.erro) && 
            <div>
              <Card style={{ width: '90vw' }}>
                <Card.Body>
                  <Card.Title>Sua promoção foi enviada!</Card.Title>
                  <Card.Text>
                    Porcentagem: {this.state.valor}% <br />
                    Id da seção: {this.state.id}
                  </Card.Text>
                  <Card.Link onClick={this.handleNovaPromo} style={{cursor:'pointer'}}>Criar outra</Card.Link>
                  <LinkContainer to="/listarpromos">
                    <Card.Link onClick={this.handleNovaPromo}>Ver promoções ativas</Card.Link>
                  </LinkContainer>
                </Card.Body>
              </Card>
            </div>
          }
          {!this.state.enviado && 
            <Form onSubmit = {this.sendPromo} style={{width: '90vw'}}>
              <Form.Group className="mb-3" controlId="valor">
                <Form.Label>Valor da promoção (%)</Form.Label>
                <Form.Control type="number" placeholder="10" onChange={this.handleValor}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>ID da seção</Form.Label>
                <Form.Control type="number" placeholder="1" onChange={this.handleId}/>
              </Form.Group>
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

export default NovaPromocao;