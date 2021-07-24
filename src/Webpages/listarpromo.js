import React, { useEffect, useState } from 'react';
import api from "../services/api.js";
import { LinkContainer } from 'react-router-bootstrap'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'



const ListarPromocao = () => {

  function delPromo(id) {
    api.delete("/promocao/"+id
    )
    .then((response) => {console.log("Deletado!")})
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    })
  }

  const [promos, setPromos] = useState(null);

  useEffect(() => {
    api
      .get("/promocao")
      .then((response) => setPromos(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, [promos]);

  if (!promos) return null;

  return(
    <div>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
        <h1 style={{width: '90vw'}}>Promoções</h1>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
        <div style={{width: '90vw', marginBottom: '15px'}}>
          <ListGroup>
          {promos.map(promo =>
          <ListGroup.Item>
            <Container>
              <Row>
                <Col>
                  <p>Promoção {promo.promocao_id} </p>
                  <p>{promo.porcentagem}% de desconto na seção {promo.secao_id}</p>
                </Col>
                <Col style={{display: 'flex', justifyContent:'center', flexDirection: 'column'}}>
                  <Button variant="danger" style={{marginBottom: '10px', width: '30%'}} onClick={() => delPromo(promo.promocao_id)}>Deletar promoção</Button>
                  <LinkContainer to={{
                    pathname: "/produtos",
                    search: "?secao="+promo.secao_id
                  }}
                  style={{width: '30%'}}
                  >
                    <Button variant="primary">Ver produtos</Button> 
                  </LinkContainer>
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

export default ListarPromocao;