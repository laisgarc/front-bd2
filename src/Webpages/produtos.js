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

  let promoAtiva = [];
  let secao = useQuery();
  let secaoID = secao.get("secao");
  const [produtos, setProdutos] = useState(null);
  const [promos, setPromos] = useState([]);

  useEffect(() => {
    api
      .get("/produto/"+secaoID)
      .then((response) => setProdutos(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  function insertPromo(promo){
    if(promo.secao_id === parseInt(secaoID)){
      setPromos(promos => [...promos, promo])
    }
  }

  useEffect(() => {
    api
      .get("/promocao")
      .then((response) => {
        response.data.map(promo =>insertPromo(promo))
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);


  if (!produtos) return null;
  if (!promos) return null;
  return(
    <div>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
        <h1 style={{width: '90vw'}}>Lista de produtos da seção {secaoID} </h1>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
        <div style={{width: '90vw', marginBottom: '15px'}}>
          <ListGroup>
            <ListGroup.Item>
              <b>Promoções Ativas</b>
            </ListGroup.Item>
            {promos.map(promo =>
                <ListGroup.Item>
                  <p>Promoção {promo.promocao_id} </p>
                  <p>{promo.porcentagem}% de desconto na seção {promo.secao_id}</p>
                </ListGroup.Item>
            )}
            {promos.length === 0 &&
              <ListGroup.Item>
                Não há promoções ativas para esta seção
              </ListGroup.Item>
            }
          </ListGroup>
        </div>
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