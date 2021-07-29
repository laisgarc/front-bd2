import React from 'react';
import Card from 'react-bootstrap/Card';

const Home = () => {

  return(
    <div>
      <div style={{display: 'flex', justifyContent: 'center', height: '90vh', alignItems: 'center' }}>
        <Card style={{ width: '90vw', height: '50vh' }}>
          <Card.Body>
            <Card.Title>Trabalho de Banco de Dados 2</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">ACH2025</Card.Subtitle>
            <Card.Text>
              Navegue pelo menu acima. Não se esqueça de conferir se o backend e o banco de dados estão rodando
              na sua máquina!
            </Card.Text>
            <Card.Text>
              <b>Autores</b> <br />
              Arthur de Castilho Nascimento - 11270674 <br />
              Gustavo da Silva Medici - 11272056 <br />
              João Matheus Pinheiro - 11207939 <br />
              Laís Garcia - 11270628
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Home;