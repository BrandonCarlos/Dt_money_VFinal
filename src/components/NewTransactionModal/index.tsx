import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { useTransactions } from '../../hooks/useTransactions';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { Container, TransactionTypeContainer, RadioBox } from './styles';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  // Criação de HOOK só serve para deixar o código mais organizado
  const { createTransaction } = useTransactions();
  
  const [title, setTitle] = useState('');//INPUTS string começaram VÁZIOS
  const [amount, setAmount] = useState(0);//INPUTS números começaram com 0
  const [category, setCategory] = useState('');//INPUT category começando vázio

  // Vamos criar um ESTADO por que precisamos saber qual BOTÃO a pessoa clicou
  const [type, setType] = useState('deposit');//ESTADO iniciando com 'deposit'
  
  // Precisamos dizer o formato do "event" que é FormEvent

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({//ou seja vai esperar CADASTRAR (await) e depois fecha o modal
      title,
      amount,
      category,
      type
    })

    // Resetando os valores dos campos
    setTitle('');
    setAmount(0);
    setCategory('');
    setType('deposit');
    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      // Ao colocar estás linhas Abaixo o MODAL é zerado e devemos estilizarmos nós mesmos
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >

      <button type="button" 
      onClick={onRequestClose} 
      className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal"/>
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar Transação</h2>
        <input
          placeholder="titulo"
          value={title}//cada INPUT aponta para seu ESTADO
          onChange={event => setTitle(event.target.value)}//conseguindo ter o valor digitado no INPUT
        />

        <input
          type="number"
          placeholder="Valor"
          value={amount}//cada INPUT aponta para seu ESTADO
          onChange={event => setAmount(Number(event.target.value))}//conseguindo ter o valor digitado no INPUT
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button" 
            onClick={() => { setType('deposit'); }}
            isActive={type === 'deposit'}//retorna TRUE caso o type que foi selecionado foi 'deposit'
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada"/>
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button" 
            onClick={() => { setType('withdraw'); }}
            isActive={type === 'withdraw'}//o isActive acusa ERRO, pois no Button elemento HTML não existe essa propriedade chamada isActive
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saida"/>
            <span>Saida</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          value={category}//cada INPUT aponta para seu ESTADO
          onChange={event => setCategory(event.target.value)}//conseguindo ter o valor digitado no INPUT
        />

        <button type="submit">
          Cadastrar
        </button>
      </Container>
    </Modal>
  );
}