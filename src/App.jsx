import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Favorites from './Favorites';
import styled from 'styled-components';
import Theme from './Theme';
import Header from './Components/Header';
const Container = styled.div`
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(221, 221, 221, 1) 48%
  );
  min-height: 100vh;
  margin: 0;
  display: flex;
  justify-content: center;
`;

function App() {
  return (
    <Theme>
      <BrowserRouter>
        <Header></Header>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </Theme>
  );
}

export default App;
