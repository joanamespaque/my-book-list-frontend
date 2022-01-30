import React from 'react';
import styled from 'styled-components';
import BookList from './Components/BookList'
import BookCard from './Components/BookCard';
import Message from './Components/Message';
import FavoriteTabs from './Components/FavoriteTabs';
import lupa from './Assets/lupa.svg';
import SearchInput from './Components/SearchInput';
import FavoriteTabss from './Components/FavoriteTabs';
import LinearProgress from '@mui/material/LinearProgress';
import useFetch from './Hooks/useFetch';
import { GOOGLE_BOOKS_GET, BOOKS_LIST } from './Api';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3vh;

`;

const Home = ({ filter }) => {
  const [books, setBooks] = React.useState(false);
  const [favorites, setFavorites] = React.useState([]);
  const [tab, setTab] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const { data, error, request } = useFetch();

  async function fetchBooks() {
    setLoading(true);
    const { url, options } = GOOGLE_BOOKS_GET();
    const { json } = await request(url, options);
    let response = [];
    json.items.map((item) => {
      item = {
        id: item.id,
        ...item.volumeInfo
      };
      response.push(item);
    })
    setLoading(false);
    return response;
  }
  async function fetchFavoritesBooks() {
    setLoading(true);
    const { url, options } = BOOKS_LIST();
    const { json } = await request(url, options);
    setLoading(false);
    return json;
  }

  React.useEffect( async () => {
    await getBooks(0);
  }, [request]);

  async function handleChange({ target }) {
    const result = await getBooks(tab);
    const search = target.value;
    setBooks(await filterBooks(search, result));
  }

  async function getBooks (tab) {
    const favorites_result = await fetchFavoritesBooks();
    localStorage.clear();
    favorites_result.map((item) => {
      localStorage.setItem(item.book_id, item.id);
    })
    setFavorites(favorites_result);
    if (tab === 0) {
      const result = await fetchBooks();
      setBooks(result);
      return result;
    } else {
      setBooks(favorites_result);
      return favorites_result;
    }
  }

  function filterBooks (value, books) {
    return books.filter(({title}) => {
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
      { loading && <LinearProgress color="secondary" sx={{marginTop: -0.5}} />}
      { data &&
        <BookList books={books} favorites={favorites}></BookList>
      }
      </Container>
    );
};

export default Home;
