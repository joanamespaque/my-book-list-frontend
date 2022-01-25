import React from 'react';
import styled, { css } from 'styled-components';
import { SearchOff } from '@styled-icons/material/SearchOff'
import { CheckCircleOutline } from '@styled-icons/material/CheckCircleOutline'

const SuccessIcon = styled(CheckCircleOutline)`
  color: ${props => props.theme.colors.success};
`

const ErrorIcon = styled(SearchOff)`
  color:  ${props => props.theme.colors.error};
`

const MessageDiv = styled.div`
  display: flex;
  width: 30vw;
  height: 6vh;
  padding: 5px 0px 5px 30px;
  align-items: center;
  margin: 30px 0 30px 0;
  background-color: white;
  border-radius: 0px 10px 10px 0px;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.1);
`;

const ColorDiv = styled(MessageDiv)`
  width: 10px;
  height: 6vh;
  margin: 30px 0 30px 0;
  border-radius: 10px 0px 0px 10px;
  ${(props) =>
    props.error &&
    css`
      background: ${props.theme.colors.messages.error}
    `
  }
  ${(props) =>
    props.info &&
    css`
      background: ${props.theme.colors.messages.info}
    `
  }
  ${(props) =>
    props.success &&
    css`
      background: ${props.theme.colors.messages.success}
    `
  }
`;

const Text = styled.div`
  color: ${props => props.theme.colors.fonts.text};
  padding-left: 15px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
`;

const Message = ({text, ...props}) => {
  return (
    <Container>
      <ColorDiv {...props}></ColorDiv>
      <MessageDiv >
        {props.success && <SuccessIcon size="35"></SuccessIcon>}
        {props.error && <ErrorIcon size="35"></ErrorIcon>}
        <Text>{text}</Text>
      </MessageDiv>
    </Container>
  );
};

export default Message;
