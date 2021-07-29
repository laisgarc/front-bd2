import React from 'react';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'

class Header extends React.Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Mercado CompreMais</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Produtos" id="basic-nav-dropdown">
                <LinkContainer to="/novoproduto">
                  <NavDropdown.Item>Novo produto</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer  to="/secoes">
                  <NavDropdown.Item>Listar Seções</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              <NavDropdown title="Promoções" id="basic-nav-dropdown">
                <LinkContainer to="/novapromocao">
                  <NavDropdown.Item>Nova Promoção</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/listarpromos">
                  <NavDropdown.Item>Listar Promoções</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Header;