import React from 'react';
import styled from 'styled-components';

const Field = styled.textarea`
  font-size: 20px;
  padding: 20px ;
  border: 1px solid rgba(128, 128, 128, 0.16);
  border-radius: 15px;
  color: rgb(70, 70, 70);
  transition: all 0.3s;

  &:focus {
    outline: none;
    box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.1);
  }

`;
const DescriptionField = ({ handleChange }) => {
  return <Field rows="5" cols="33" onChange={handleChange} placeholder='Digite uma anotação...' maxLength={500}></Field>;
};

export default DescriptionField;
