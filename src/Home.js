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
  const [tab, setTab] = React.useState('');
  const { data, error, request } = useFetch();

  async function fetchBooks() {
    const { url, options } = GOOGLE_BOOKS_GET();
    const { json } = await request(url, options);
    return json;
  }
  async function fetchFavoritesBooks() {
    const { url, options } = BOOKS_LIST();
    const { json } = await request(url, options);
    console.log(json);
    return json;
  }

  React.useEffect( () => {
    fetchBooks().then((response) => setBooks(response.items));
  }, [request]);

  function handleChange({ target }) {
    let result;
    if (tab === 0) {
      fetchBooks().then((response) => { result = response });
    } else {
      fetchFavoritesBooks().then((response) => { result = response });
    }
    const search = target.value;
    const filter = result.items.filter((book) => {  return book.volumeInfo.title.toLowerCase().indexOf(search.toLowerCase().trim()) !== -1 })
    setBooks(filter);
  }

  return (
      <Container>
      <SearchInput handleChange={handleChange}></SearchInput>
      <FavoriteTabs setTabs={setTab}></FavoriteTabs>
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
