import React, { useEffect, useState } from 'react';
import api from "../services/api.js";
import {
  useLocation
} from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'

const Produtos = () => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let secao = useQuery();
  let secaoID = secao.get("secao");
  const [produtos, setProdutos] = useState(null);

  useEffect(() => {
    api
      .get("/produto/"+secaoID)
      .then((response) => setProdutos(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  if (!produtos) return null;

  return(
    <div>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
        <h1 style={{width: '90vw'}}>Lista de produtos da seção {secaoID} </h1>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
        <div style={{width: '90vw', marginBottom: '15px'}}>
          <ListGroup>
            {produtos.map(produto =>
              <ListGroup.Item>
                <Container>
                  <Row>
                    <Col>
                      <p style={{marginBottom: '0'}}>{produto.nome_produto}<br />
                      <span className="text-muted">{produto.marca_produto}</span></p>
                    </Col>
                    <Col>
                      <p style={{color: '#dc3545 '}}>{produto.preco_unitario}</p>
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

export default Produtos;