import React, { Component } from 'react';
import api from "../services/api.js";
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ModalFornecimento from '../components/fornecimentoNovo'
import Row from 'react-bootstrap/Row'
import { LinkContainer } from 'react-router-bootstrap';
import { FormSelect } from 'react-bootstrap';

class NovoProduto extends Component {
  state = {
    fornecimento: [],
    fornecimentoId: 0,
    marca:'',
    preco:'',
    nome:'',
    id: 0,
    enviado: false,
    resposta: '',
    erro: false,
    show: false,
    forn_data: '',
    forn_id: 0,
    fornecedores: [],
    addForn: false,
    updateForn: false,
    updateFornecimento: false,
    secoes: []
  }

  handleupdate = () => {
    this.setState({
      updateForn: true
    })
  }
  handleupdateFornecimento = () => {
    this.setState({
      updateFornecimento: true
    })
  }

  sendProd = (e) => {
    e.preventDefault();
    api.post("/insert/produto", {
      fornecimento_id: this.state.fornecimentoId,
      marca: this.state.marca,
      preco: this.state.preco,
      nome: this.state.nome,
      secao_id: this.state.id,
      franquia_id: 1
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
      preco: "R$ " + event.target.value
    })
  }

  handleFornecimento = event => {
    this.setState({
      fornecimentoId: event.target.value
    })
  }

  handleMarca = event => {
    this.setState({
      marca: event.target.value
    })
  }
  
  handleNome = event => {
    this.setState({
      nome: event.target.value
    })
  }

  handleNovoProd = () => {
    this.setState({
      fornecimento: [],
      marca:'',
      preco:'',
      nome:'',
      id: 0,
      enviado: false,
      resposta: '',
      erro: false,
      forn_data: '',
      forn_id: 0
    })
  }

  handleShow = () => {
    this.setState({
      show: true
    })
  }

  handleClose = () => {
    this.setState({
      show: false
    })
  }

  componentDidMount() {
      api
      .get("/fornecimento")
      .then((response) => {
        this.setState({
          fornecimento: response.data
        })
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
      api.get("/fornecedor").then((response) => {
        this.setState({
          fornecedores: response.data
        })
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
      api
      .get("/secao")
      .then((response) => 
        this.setState({
          secoes: response.data
        })
      )
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }

  componentDidUpdate() {
    if(this.state.updateForn){
      api.get("/fornecedor").then((response) => {
      this.setState({
        fornecedores: response.data,
        updateForn: false
      })
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  }
  if(this.state.updateFornecimento){
    api
      .get("/fornecimento")
      .then((response) => {
        this.setState({
          fornecimento: response.data,
          updateFornecimento: false
        })
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }
  }

  render(){
    return(
      <div>
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
            <h1 style={{width: '90vw'}}>Inserir novo produto</h1>
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
                  <Card.Link onClick={this.handleNovoProd} style={{cursor:'pointer'}}>Voltar</Card.Link>
                </Card.Body>
              </Card>
            </div>
          }
          {(this.state.enviado && !this.state.erro) && 
            <div>
              <Card style={{ width: '90vw' }}>
                <Card.Body>
                  <Card.Title>Seu produto foi adicionado!</Card.Title>
                  <Card.Text>
                    Nome: {this.state.nome}<br />
                    Id da seção: {this.state.id}
                  </Card.Text>
                  <Card.Link onClick={this.handleNovoProd} style={{cursor:'pointer'}}>Criar outra</Card.Link>
                  <LinkContainer   to={{
                    pathname: "/produtos",
                    search: "?secao="+this.state.id
                  }}>
                    <Card.Link onClick={this.handleNovoProd}>Ver produtos da seção</Card.Link>
                  </LinkContainer>
                </Card.Body>
              </Card>
            </div>
          }
          {!this.state.enviado && 
            <Form onSubmit = {this.sendProd} style={{width: '90vw', border: '1px solid rgba(0,0,0,.125)', padding: '1rem 1rem', borderRadius: '.25rem'}}>
              <Container style={{padding: '0', margin: 'auto 0'}}>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="nome">
                      <Form.Label>Nome do produto</Form.Label>
                      <Form.Control type="text" placeholder="10" onChange={this.handleNome}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="valor">
                      <Form.Label>Valor do produto</Form.Label>
                      <Form.Control type="number" placeholder="10" onChange={this.handleValor}/>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>ID da seção</Form.Label>
                      <Form.Select onChange={this.handleSecao}>
                        <option>Seção</option> 
                        {this.state.secoes.map(secao => 
                          <option value={secao.secao_id}>{secao.nome_sec}</option>
                        )}
                      </Form.Select> 
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="nome">
                      <Form.Label>Marca</Form.Label>
                      <Form.Control type="text" placeholder="10" onChange={this.handleMarca}/>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Selecionar ou criar fornecimento</Form.Label>
                      <Row>
                        <Col>
                          <Form.Select aria-label="select fornecimento" onChange={this.handleFornecimento}>
                            <option>Fornecimento</option>
                            {this.state.fornecimento.map(fornecimento => 
                              <option value={fornecimento.fornecimento_id}>
                              ID: {fornecimento.fornecimento_id} Data: {fornecimento.data_forn}
                              </option>  
                            )}
                          </Form.Select>
                        </Col>
                        <Col>
                          <Button variant="primary" onClick={this.handleShow}>
                            Adicionar novo
                          </Button>
                          <ModalFornecimento handlefornecimento={() => {this.handleupdateFornecimento()}} handleupdate={() => {this.handleupdate()}} handleClose={() => {this.handleClose()}} show={this.state.show} fornecedores={this.state.fornecedores} />
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary" type="submit" style={{marginTop: '15px'}}>
                  Enviar
                </Button>
              </Container>
            </Form>
          }
        </div>
      </div>
    )
  }
}

export default NovoProduto;