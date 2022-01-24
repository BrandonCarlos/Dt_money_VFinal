import React, { useContext } from 'react';
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';
import { Container } from "../Summary/styles";

export function Summary() {

  // Vamos OBTER os valores do CONTEXTO
  // OBS: sempre que o contexto muda o COMPONENTE é RENDERIZADO denovo
  const { transactions } = useTransactions();
  console.log(transactions);

  const summary = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'deposit') {
      acc.deposits += transaction.amount;//amount = VALOR
      acc.total += transaction.amount;
    }
    else {
      acc.withdraws += transaction.amount;
      acc.total -= transaction.amount;
    }

    return acc;//sempre devemos retornar o CONTADOR
  }, {
    deposits: 0,
    withdraws: 0,
    total: 0
  })

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>{new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(summary.deposits)}</strong>
      </div>
      <div>
        <header>
          <p>Saidas</p>
          <img src={outcomeImg} alt="Saidas" />
        </header>
        <strong>-{new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(summary.withdraws)}</strong>
      </div>
      <div className="highligth-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>{new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(summary.total)}</strong>
      </div>
    </Container>
  )
}