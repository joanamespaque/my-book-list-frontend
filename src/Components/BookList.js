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

const BookList = ({ books, favorites }) => {
  let favorites_ids = [];
  favorites.map((item) => favorites_ids.push(item.book_id ? item.book_id : item.id))
  return (
    <List>
      {
        books.length > 0 ?
        books.map((book, key) =>
            <BookCard
              key={key}
              book={book}
              favorite={favorites_ids.includes(book.book_id ? book.book_id : book.id) ? true : false}
            ></BookCard>
        )
        :
        books.length === 0 && (
        <Message error text="Nada encontrado"/>
        )
      }
    </List>

  )
};

export default BookList;
