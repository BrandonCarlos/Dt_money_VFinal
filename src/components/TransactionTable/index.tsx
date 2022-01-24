import { Container } from "./styles";
import { useTransactions } from "../../hooks/useTransactions";



export function TransactionTable() {
  const { transactions } = useTransactions();

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(transaction => (
            // todo elemento que eu faço um MAP, no elemento abaixo eu preciso
            //informar o KEY no caso informo o KEY no <TR key="">
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(transaction.amount)}
              </td>
              <td>{transaction.category}</td>
              <td>
                {new Intl.DateTimeFormat('pt-BR').format(
                  new Date(transaction.createdAt)//precisa converter a STRING em uma DATA
                )}
              </td>
            </tr>
          ))}
        </tbody> 
      </table>
    </Container>
  )
}