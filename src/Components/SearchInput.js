import React from 'react';
import styled from 'styled-components';
import lupa from '../Assets/lupa.svg';

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;
const SearchForm = styled.form`
  width: 40vw;
  position: relative;
  &:hover {
    outline: none;
    transform: scale(1.1);
    transition: all 0.3s;
  }
`;
const Input = styled.input`
  font-size: 20px;
  width: 93%;
  padding: 20px ;
  border: none;
  border-radius: 15px;
  color: rgb(70, 70, 70);
  transition: all 0.3s;
  &:focus {
    outline: none;
    box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.1);
  }

  @media(max-width: 900px) {
    width: 100% !important;
  }

`;
const Icon = styled.div`
  outline: none;
  box-shadow: none;
  width: 30px;
  height: 60px;
  background: url(${lupa}) no-repeat center;
  background-size: 40px;
  border: none;
  position: absolute;
  cursor: pointer;
  top: 0px;
  right: 35px;
  padding-top: 10px;

  @media(max-width: 1000px) {
    right: -5px !important;
  }
  @media(max-width: 800px) {
    right: -20px !important;
  }
`;

const SearchInput = ({ handleChange }) => {
  return (
    <Container>
      <SearchForm>
          <Input onChange={handleChange} type="text" placeholder='Buscar livros...'></Input>
          <Icon></Icon>
      </SearchForm>
    </Container>
  );
};

export default SearchInput;
