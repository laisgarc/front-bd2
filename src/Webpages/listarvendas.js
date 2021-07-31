import React, { useEffect, useState } from 'react';
import api from "../services/api.js";
import { LinkContainer } from 'react-router-bootstrap'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'



const ListarVendas = () => {

  const [vendas, setVendas] = useState(null);

  const fetchVendas = () => {
    api
      .get('/venda')
      .then((response) => setVendas(response.data))
      .catch((err) => {
        console.error('ops! ocorreu um erro' + err);
      });
  };

  useEffect(fetchVendas, []);


  if (!vendas) return null;

  return(
    <div>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
        <h1 style={{width: '90vw'}}>Vendas</h1>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
        <div style={{width: '90vw', marginBottom: '15px'}}>
          <ListGroup>
          {vendas.map(venda =>
          <ListGroup.Item>
            <Container>
              <Row>
                <Col>
                  <p>{venda.valor} em {venda.parcelas} vezes</p>
                  <p>Funcionário responsável: {venda.funcionario_id}</p>
                  <p>Caixa: {venda.caixa}</p>
                  <p>Data: {venda.data_venda}</p>
                  <p>Cliente: {venda.cliente_id}</p>
                </Col>
              </Row>
            </Container>
          </ListGroup.Item>
          )}
          </ListGroup>
        </div>
      </div>
    </div>
  );
}

export default ListarVendas;