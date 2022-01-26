import React from 'react';
import styled from 'styled-components';
import BookList from './Components/BookList'
import BookCard from './Components/BookCard';
import Message from './Components/Message';
import FavoriteTabs from './Components/FavoriteTabs';
import lupa from './Assets/lupa.svg';
import SearchInput from './Components/SearchInput';
import FavoriteTabss from './Components/FavoriteTabs';
import useFetch from './Hooks/useFetch';
import { GOOGLE_BOOKS_GET, BOOKS_LIST } from './Api';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3vh;

`;

const List = styled.div`
  margin-top: 5vh;
  display: flex;
  flex-wrap: wrap;
  // justify-content: center;
  width: 80vw;
  margin: 0 auto;
  padding: 30px;
`;

const Home = ({ filter }) => {
  const [books, setBooks] = React.useState([]);
  const [tab, setTab] = React.useState(0);
  const { data, error, request } = useFetch();

  async function fetchBooks() {
    const { url, options } = GOOGLE_BOOKS_GET();
    const { json } = await request(url, options);
    return json;
  }
  async function fetchFavoritesBooks() {
    console.log('entrou')
    const { url, options } = BOOKS_LIST();
    const { json } = await request(url, options);
    return json;
  }

  React.useEffect( () => {
    fetchBooks().then((response) => setBooks(response.items));
  }, [request]);

  async function handleChange({ target }) {
    const result = await getBooks(tab);
    const search = target.value;

    setBooks(await filterBooks(search, result.items ? result.items : result));
  }

  async function getBooks (tab) {
    if (tab === 0) {
      return await fetchBooks();
    } else {
      return await fetchFavoritesBooks;
    }
  }

  function filterBooks (value, books) {

    return books.filter(({volumeInfo}) => {
      const { title } = volumeInfo;
      return normalize(title).includes(normalize(value));
    })
  }

  function normalize (text) {
    return text.toLowerCase().trim();
  }

  return (
      <Container>
      <SearchInput handleChange={handleChange}></SearchInput>
      <FavoriteTabs handleChangeTab={getBooks}></FavoriteTabs>
      { error && <Message error text="Nada encontrado" />}
      { data &&
        <List>
            {
              books.map((book, key) =>
                  <BookCard
                    key={key}
                    book={book.volumeInfo}
                  ></BookCard>
              )
            }
        </List>
      }
      </Container>
    );
};

export default Home;
