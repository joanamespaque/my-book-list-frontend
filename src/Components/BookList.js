import React from 'react';
import styled from 'styled-components';
import BookCard from './BookCard'
import useFetch from '../Hooks/useFetch'
import { GOOGLE_BOOKS_GET } from '../Api';
import Message from './Message';

const List = styled.div`
  margin-top: 5vh;
  width: 80vw;
  margin: 0 auto;
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
`;

const BookList = ({ filter }) => {
  const { data, error, request } = useFetch();
  React.useEffect(() => {
    async function fetchBooks() {
      const { url, options } = GOOGLE_BOOKS_GET();
      const { response, json } = await request(url, options);
    }
    fetchBooks();
  }, [request]);
  const [search, setSearch] = React.useState('');
  function handleChange({ target }) {
    setSearch(target.value);
  }

  if (error) return <Message error text="Nada encontrado" />;
  if (data)
    return (
      <List>
          {
            data.items.map((book, key) =>
                <BookCard
                  key={key}
                  book={book.volumeInfo}
                ></BookCard>
            )
          }
      </List>
    );
  else return null;
};

export default BookList;
