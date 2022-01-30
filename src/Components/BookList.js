import React from 'react';
import styled from 'styled-components';
import BookCard from './BookCard'
import Message from './Message';

const List = styled.div`
  margin-top: 5vh;
  display: flex;
  flex-wrap: wrap;
  width: 1500px;
  margin: 0 auto;
  padding: 30px;
  @media(max-width: 1590px) {
    width: 1130px;
  }
  @media(max-width: 1170px) {
    width: 750px;
  }
  @media(max-width: 815px) {
    width: 375px;
  }
`;

const BookList = ({ books }) => {
  return (
    <List>
      {
        books.length > 0 ?
        books.map((book, key) =>
            <BookCard
              key={key}
              book={book.volumeInfo}
            ></BookCard>
        )
        :
        <Message error text="Nada encontrado"/>
      }
    </List>

  )
};

export default BookList;
