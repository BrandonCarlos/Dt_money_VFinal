import styled from "styled-components";
import { darken, transparentize } from 'polished';

export const Container = styled.form`
  h2 {
    color: var(--text-title);
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }  

  input {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    border-radius: 0.25rem;
    background: #e7e9ee;
    border: 1px solid #d7d7d7;
    font-weight: 400;
    font-size: 1rem;

    &::placeholder {
      color: var(--text-body);
    }

    & + input {
      margin-top: 1rem;
    }
  }

  button[type="submit"] {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    background: var(--green);
    color: #FFF;
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    margin-top: 1.5rem;
    font-weight: 600;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;

export const TransactionTypeContainer = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`;


interface RadioBoxProps {
  isActive: boolean;
  // activeColor: string;//ta dando erro no colors[props.activeColor], pq to dizendo que recebe qualquer STRING "uma string"
  //e não recebe 1 STRING e sim 2, "green" e "red" 
  activeColor: 'green' | 'red';//antes eu podia passar qualquer STRING, agora so posso passar essas 2 string's
}

// vamos fazer um MAP das cores
const colors = {
  green: '#33CC95',
  red: '#E52E4D'
}

// O que fizemos aqui? dizemos que o Button elemento HTML, agora possui
// a propriedade isActive que eu inventei lá no index.tsx
export const RadioBox = styled.button<RadioBoxProps>`
    height: 4rem;
    border: 1px solid #d7d7d7;
    border-radius: 0.25rem;
    /* Vamos mudar o background atrávez da propriedade isActive */
    /* Automáticamente é passado todas as PROPRIEDADES do Componente
    quando utilizamos arrow function, ou seja temos acesso a todas as 
    propriedades do meu BUTTON lá no index.tsx, incluindo o isActive */
    background: ${(props) => props.isActive 
    ? transparentize(0.9 ,colors[props.activeColor])//to falando que quero a cor 90% transparente
    : 'transparent'};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.2s;

    &:hover {
      border-color: ${darken(0.1, '#d7d7d7')};//irá escurecer a cor #d7d7d7 em 10%
    }

    img {
      width: 20px;
      height: 20px;
    }

    span {
      display: inline-block;
      margin-left: 1rem;
      font-size: 1rem;
      color: var(--text-title);
    }
`;