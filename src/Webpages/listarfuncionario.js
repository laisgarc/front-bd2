import React, { useEffect, useState } from 'react';
import api from "../services/api.js";
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'


const ListarFuncionario = () => {

  const [funcionarios, setFunc] = useState([]);

  const fetchFuncionario = () => {
    api
    .get("/funcionario")
    .then((response) =>  setFunc(response.data))
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  }

  useEffect(fetchFuncionario, []);

  if (!funcionarios) return null;

  return(
    <div>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
        <h1 style={{width: '90vw'}}>Funcionários</h1>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
        <div style={{width: '90vw', marginBottom: '15px'}}>
          <ListGroup>
          {funcionarios.map(funcionario =>
          <ListGroup.Item>
            <Container>
              <Row>
                <Col>
                  <p>{funcionario.nome_func} {funcionario.sobrenome_func}</p>
                  <p>Cargo: {funcionario.cargo}</p>
                </Col>
                <Col style={{display: 'flex', justifyContent:'center', flexDirection: 'column'}}>
                <p>Data de admissão: {funcionario.data_admissao}</p>
                  <p>CPF: {funcionario.cpf_func}</p>
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

export default ListarFuncionario;