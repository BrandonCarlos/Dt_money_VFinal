import { useState } from 'react';
import Modal from 'react-modal';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { NewTransactionModal } from './components/NewTransactionModal';
import { TransactionsProvider } from './hooks/useTransactions';
import { GlobalStyle } from './styles/global';

Modal.setAppElement('#root');

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    // Agora qualquer componente dentro de TransactionsContext.Provider
    // Pode consumir o valor do CONTEXTO
    <TransactionsProvider>
        <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
        <Dashboard />

        <NewTransactionModal 
        isOpen={isNewTransactionModalOpen}//aqui está retornando ou TRUE ou FALSE
        onRequestClose={handleCloseNewTransactionModal}
        />
        <GlobalStyle />  
    </TransactionsProvider>
  );
}