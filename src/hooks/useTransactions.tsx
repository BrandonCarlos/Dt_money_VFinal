// Forma mais simples de criar um CONTEXTO no react
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

// Vamos omitir de Transaction(Interface de cima ai) o ID e CREATEDAT
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>


// Para falarmos que o TransactionsProvider vai receber Contéudo(CHILDREN)
// precisamos criar está INTERFACE
interface TransactionsProviderProps {
  // ReactNode -> aceita qualquer tipo de contéudo válido pro React, aceita tag JSX, HTML, aceita TEXTO diretamente
  children: ReactNode;
}

// O createContext não devolve apenas um LISTA agora, agora devolve uma LISTA
// e UMA FUNÇÃO então vamos arrumar esse retorno
interface TransactionsContextData {
  transactions: Transaction[];//array de transactions com o FORMATO claro
  createTransaction: (transaction: TransactionInput) => Promise<void>;//void pois a função não retorna NADA
}

// Abaixo no createContext to dizendo que o CONTEXTO carrega uma "LISTA de Transaction"
const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);//este context inicia o valor por padrão como ARRAY VÁZIO
// Para os outros COMPONENTES enxergarem o CONTEXTO devemos por o 
// Provider por volta dos outros COMPONENTES

// Exportando um COMPONENTE
export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
 
  useEffect(() => {
    api.get(`transactions`)//com axios não precisamos mais converter p/ JSON
    .then(response => setTransactions(response.data.transactions));
  }, [])

  // Novamente temos que TIPAR o "transaction" pois devemos sabeer o que esse parametro irá receber
  async function createTransaction(transactionInput: TransactionInput) {
    // Salvando os dados capturados dos INPUTS e guardando na váriavel DATA

    // Importando a API e vamos fazer uma inserção então usamos POST
    const response = await api.post('/transactions', {
      ...transactionInput,//pegando todos os dados do transactionInput
      //e abaixo mudando  o createdAt
      createdAt: new Date(),
    });   
    const { transaction } = response.data;

    // Respeitando o método de imutabilidade, criando novo array
    setTransactions([
      ...transactions,
      transaction
    ]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      { children }
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  // Um Hook no ReactJS pode usar de outros HOOK's ou seja pode usar 
  // useEffect, useState, useContext etc...
  const context = useContext(TransactionsContext)
  return context;
}