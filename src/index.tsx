import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

// Vou chamar o createServer e definir as minhas ROTAS ficticias
createServer({
  // MirageJS possui um banco de dados interno
  models: {
    // Nome da tabela, entidade que vamos salvar os dados
    transaction: Model,
  },

  // Vamos criar alguns dados ficticias para nossa interface já começar mais amigável
  seeds(server) {
    server.db.loadData({
      // Nome do modal(TABELA) no plural
      transactions: [
        {
          // E aqui vamos devolver as transactions que eu quero iniciar
          id: 1,
          title: 'Freelance de Website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2022-01-12 14:00:00'),
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 1100,
          createdAt: new Date('2022-01-14 16:00:00'),
        },
      ],
    })
  },

  routes() {
    this.namespace = 'api';//captar todas as chamadas que vem de api/
    this.get('/transactions', () => { //como se fosse api/transactions <- não é necessário colocar a rota inteira
      return this.schema.all('transaction');//retornando todas as TRANSACTIONS do banco de dados
    });
    // Schema é o Banco de dados
    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);//lá do front-end foi enviado em formato JAVASCRIPT {}
      //porém aqui vamos pegar e formatar no formato JSON
      
      //1° parâmetro o MODEL que vai inserir, MODEL = "TABELA"
      //2° parâmetro os DADOS que vou passar pra dentro desse MODEL
      return schema.create('transaction', data);
    });
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
); 
