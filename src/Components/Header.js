import React from 'react';
import styled from 'styled-components';
import icon from '../Assets/icon.svg'
import mbl from '../Assets/mbl.svg'

const GradientDiv = styled.div`
  height: 15px;
  background: rgb(159, 21, 207);
  background: linear-gradient(
    90deg,
    rgba(159, 21, 207, 1) 5%,
    rgba(45, 215, 204, 1) 30%,
    rgba(248, 217, 59, 1) 60%,
    rgba(239, 156, 23, 1) 95%
  );
`;
const LogoDiv = styled.div`
    display: flex;
    justify-content: space-between;
    width: 340px;
    margin: 0 auto;
    padding-top: 40px;
    &:hover {
      outline: none;
      transform: scale(1.05);
      transition: all 1s;
    }
`;
const Logo = styled.img`
  width: 60px;
  `;
const MyBookList = styled.img`
  height: 60px;
  opacity: 0.7;
`;

const Header = () => {
  return (
    <>
      <GradientDiv></GradientDiv>
      <LogoDiv>
        <Logo src={icon}></Logo>
        <MyBookList src={mbl}></MyBookList>
      </LogoDiv>
    </>
  );
};

export default Header;
