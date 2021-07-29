import React, { useEffect, useState } from 'react';
import api from "../services/api.js";
import { LinkContainer } from 'react-router-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup'
import Nav from 'react-bootstrap/Nav'

const Secao = () => {
  const [secoes, setSecoes] = useState(null);

  useEffect(() => {
    api
      .get("/secao")
      .then((response) => setSecoes(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  if (!secoes) return null;



  return(
    <div>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
        <h1 style={{width: '90vw'}}>Seções</h1>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
        <div style={{width: '90vw', marginBottom: '15px'}}>
          <ListGroup>
          {secoes.map(secao =>
          <ListGroup.Item>
            <LinkContainer to={{
                pathname: "/produtos",
                search: "?secao="+secao.secao_id
              }}>
              <Nav.Link>
                {secao.nome_sec}
              </Nav.Link>
            </LinkContainer>
          </ListGroup.Item>
          )}
          </ListGroup>
        </div>
      </div>
    </div>
  );
}

export default Secao;