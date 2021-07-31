import React, { Component } from 'react';
import api from "../services/api";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';

class ModalFornecimento extends React.Component {

  state = {
    addForn: false,
    nome: '',
    cnpj: '',
    email: '',
    data: '',
    fornecedor: 0
  }

  handleNome = event => {
    this.setState({
      nome: event.target.value
    })
  }

  handleCNPJ = event => {
    this.setState({
      cnpj: event.target.value
    })
  }

  handleEmail = event => {
    this.setState({
      emai: event.target.value
    })
  }

  handleAddforn = () => {
    this.setState({
      addForn: true
    })
  }

  handleCloseForn = () => {
    this.setState({
      addForn: false
    })
  }

  handleData = event => {
    this.setState({
      data: event.target.value
    })
  }

  handleFornecedor = event => {
    this.setState({
      fornecedor: event.target.value
    })
  }

  sendFornecedor = (e) => {
    e.preventDefault();
    api.post("/insert/fornecedor", {
      cnpj: this.state.cnpj,
      nome: this.state.nome,
      email: this.state.email
    }).then((response) => 
    {
      this.setState({
        addForn: false
      })
      this.props.handleupdate()
    }
    ).catch((err) => {
      console.error("ops! ocorreu um erro" + err);
      this.setState({
        addForn: false
      })
    })
  }

  sendFornecimento = (e) => {
    e.preventDefault();
    api.post("/insert/fornecimento", {
      fornecedor_id: this.state.fornecedor,
      data: this.state.data,
      franquia_id: 1
    }).then((response) => {  
      this.props.handleClose();
      this.props.handleupdateFornecimento();
    }
    ).catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    })
  }

  render() {
    return(
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Novo fornecimento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group>
              <Form.Label>Data do fornecimento</Form.Label>
              <Form.Control type="text" placeholder="aaaa-mm-dd" onChange={this.handleData}></Form.Control>
          </Form.Group>
          <Form.Group style={{marginTop: '25px'}} onChange={this.handleFornecedor}>
              <Form.Select >
              <option>Fornecedores</option>
              {this.props.fornecedores.map(fornecedor =>
                  <option value={fornecedor.fornecedor_id}>{fornecedor.nome_forn}</option>  
              )}
              </Form.Select>
              <Button variant="primary" style={{marginTop: '15px'}} onClick={this.handleAddforn}>
              Novo fornecedor
              </Button>
          </Form.Group>
          </Form>
          {this.state.addForn && 
            <Form>
                <Form.Group>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control type="text" placeholder="Nome completo do fornecedor" onChange={this.handleNome}></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>CNPJ</Form.Label>
                  <Form.Control type="text" placeholder="Apenas números" onChange={this.handleCNPJ}></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="example@exp.com" onChange={this.handleEmail}></Form.Control>
                </Form.Group>
                <Row style={{marginTop: '15px'}}>
                  <Col style={{display: 'flex', justifyContent: 'center'}}>
                    <Button variant="secondary" onClick={this.handleCloseForn}>
                    Cancelar
                    </Button>
                  </Col>
                  <Col style={{display: 'flex', justifyContent: 'center'}}>
                    <Button variant="primary" onClick={this.sendFornecedor}>
                    Enviar
                    </Button>
                  </Col>
                </Row>
            </Form>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
          Cancelar
          </Button>
          <Button variant="primary" onClick={this.sendFornecimento}>
          Enviar
          </Button>
        </Modal.Footer>
      </Modal>
  )}
}


export default ModalFornecimento;