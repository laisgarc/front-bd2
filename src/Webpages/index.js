import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './home';
import Produtos from './produtos';
import ListarPromocao from './listarpromo';
import NovaPromocao from './novapromocao';
import NovoProduto from './novoproduto';
import Secao from './secao';
import Header from '../components/header.js'
import ListarFuncionarios from './listarfuncionario'
import NovoFuncionario from './novofuncionario'
import NovoCliente from './novocliente';
import NovaVenda from './novavenda';
import ListarVendas from './listarvendas'

const Webpages = () => {
    return(
        <div>
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/" component= {Home} />
                    <Route path = "/produtos" component = {Produtos} />
                    <Route path = "/novoproduto" component = {NovoProduto} />
                    <Route path = "/novapromocao" component = {NovaPromocao} />
                    <Route path = "/listarpromos" component = {ListarPromocao} />
                    <Route path = "/funcionarios" component = {ListarFuncionarios} />
                    <Route path = "/novofuncionario" component = {NovoFuncionario} />
                    <Route path = "/venda/1" component = {NovoCliente} />
                    <Route path = "/venda/2" component = {NovaVenda} />
                    <Route path = "/vendas" component = {ListarVendas} />
                    <Route path = "/secoes" component = {Secao} />
                </Switch>
            </Router>
        </div>
    );
};
export default Webpages;