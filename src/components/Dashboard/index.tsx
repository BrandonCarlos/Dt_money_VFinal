import { Container } from "../Dashboard/styles";
import { Summary } from "../Summary";
import { TransactionTable } from "../TransactionTable";

export function Dashboard() {
  return (
    <Container>
      {/* Como Summary ta dentro do Dashboard então ele também tem direito as informações das TRANSACTIONS */}
      <Summary />
      <TransactionTable />
    </Container>
  )
}