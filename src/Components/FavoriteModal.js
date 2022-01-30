import React from 'react';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import styled, { css } from 'styled-components';
import DescriptionField from './DescriptionField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useFetch from '../Hooks/useFetch';
import { FavoriteBorder } from '@styled-icons/material/FavoriteBorder';
import { Favorite } from '@styled-icons/material/Favorite';
import { Info } from '@styled-icons/material/Info';
import { BOOK_POST } from '../Api';
import { BOOK_DELETE } from '../Api';

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBox = styled(Box)`
  min-width: 280px;
  max-height: 90vh;
  display: flex;
  flex-direction: row;
  padding: 10px;
  border-radius: 20px;
  background: white;
  @media(max-width: 1215px) {
    flex-direction: column;
    overflow: scroll;
  }
  @media(max-width: 1300px) {
    h2 {
      font-size: 18px;
      text-align: center;
    }
  }
`;

const Backdrop = styled.div`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const Image = styled.img`
  height: 30vh;
  border-radius: 15px;
`;
const InfoContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  text-align: justify;
  line-height: 1.5;
  @media(max-width: 1215px) {
    h2 {
      text-align: center;
    }
    span {
      text-align: left;
    }
  }
  ${(props) =>
    props.image &&
    css`
    @media(max-width: 1215px) {
      width: 200px;
      margin: 0 auto;
    }
    `
  }
  `;
  const SubInfoContainer = styled(InfoContainer)`
  padding-right: 50px;
  @media(max-width: 1100px) {
    padding: 0;
  }
`;

const ColorButton = styled(Button)`
  width: 220px;
  background-color:  ${props => props.theme.colors.application.yellow} !important;
  border-radius: 10px !important;
  margin: 20px 0 10px 0 !important;
  &:hover {
    background-color:  ${props => props.theme.colors.application.orange} !important;
  }
  ${(props) =>
    props.favorited &&
    css`
      background-color:  ${props => props.theme.colors.application.purple} !important;
    `
  }
  ${(props) =>
    props.info &&
    css`
      background-color:  ${props => props.theme.colors.application.green} !important;
      margin: 0 !important;
      &:hover {
        background-color:  ${props => props.theme.colors.application.purple} !important;
      }
      `
    }
    ${(props) =>
      props.outlined &&
      css`
      background-color: transparent !important;
      border: 1px solid ${props => props.theme.colors.application.green} !important;
      color: ${props => props.theme.colors.application.green} !important;
      margin: 0 !important;
      &:hover {
        background-color: rgba(128, 128, 128, 0.1) !important;
      }
    `
  }
  @media(max-width: 1250px) {
    margin: 10px !important;
  }
  @media(max-width: 400px) {
    width: 180px;
  }
`;

const ButtonsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  @media(max-width: 1250px) {
    flex-direction: column-reverse;
    margin: 0 auto;
  }
`;
const Note = styled.div`
  padding: 20px 5px 10px 5px;
  color: rgb(70, 70, 70, 0.8);
`;

const FavoriteModal = ({state, book, setOpen, open, handleFavorite, setHandleFavorite, favorite}) => {
  function ChildModal() {
    const [openChild, setOpenChild] = React.useState(handleFavorite ? true : false);
    const [description, setDescription] = React.useState('');
    const { data, error, request } = useFetch();

    const handleOpenChild = () => {
      setOpenChild(true);
    };
    const handleCloseChild = () => {
      setOpenChild(false);
      setHandleFavorite(false);
    };
    const handleChange = ({ target }) => {
      setDescription(target.value);
    };

    async function handleSubmit () {
      let authors = '';
      if(book.authors) book.authors.map((author) => authors += author + ' ')
      let categories = '';
      if (book.cateogires) book.categories.map((category) =>  categories += category + ' ');
      const data = {
        title: book.title,
        description: book.description,
        favorite_description: description,
        book_id: book.id,
        authors: authors,
        publisher: book.publisher,
        infoLink: book.infoLink,
        categories: categories,
        pageCount: book.pageCount,
        thumbnail: book.imageLinks.thumbnail
      }
      console.log(data);
      console.log(book);
      const { url, options } = BOOK_POST(data);
      await request(url, options);
      return window.location.reload();
      ;
    }

    async function handleRemove () {
      const item = localStorage.getItem(book.book_id ? book.book_id : book.id);
      console.log(book)
      console.log(item)
      await fetchDeleteBook(item);
      return window.location.reload();
      ;
    }

    async function fetchDeleteBook (id) {
      const { url, options } = BOOK_DELETE(id);
      const { json } = await request(url, options);
      return json;
    }

    return (
      <>
        <ColorButton onClick={handleOpenChild} variant="contained" 
        endIcon={
          favorite ?
          <Favorite size="25"/>
          :
          <FavoriteBorder size="25"/>
        }>
          {favorite ? "Favoritado" : "Favoritar"}
        </ColorButton>
        <StyledModal
          BackdropComponent={Backdrop}
          open={openChild}
          onClose={handleCloseChild}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
          className='animeLeft'
          >
          {favorite
          ? (
            <StyledBox sx={{p:5, display:'flex', flexDirection: 'column', width: '24vw'}}>
                <h2 id="child-modal-title">Remover dos favoritos?</h2>
                <ButtonsDiv>
                  <ColorButton variant="contained" info="true" target="_blank" onClick={handleCloseChild} outlined="true">
                    Cancelar
                  </ColorButton>
                  <ColorButton variant="contained" info="true" target="_blank" onClick={handleRemove}>
                    Remover
                  </ColorButton>
                </ButtonsDiv>
            </StyledBox>
          )
          : (
            <StyledBox sx={{p:5, display:'flex', flexDirection: 'column'}}>
                <h2 id="child-modal-title">Favoritar Livro</h2>
                <DescriptionField handleChange={handleChange}></DescriptionField>
                <ButtonsDiv>
                  <ColorButton variant="contained" info="true" target="_blank" onClick={handleCloseChild} outlined="true">
                    Cancelar
                  </ColorButton>
                  <ColorButton variant="contained" info="true" target="_blank" onClick={handleSubmit}>
                    Favoritar
                  </ColorButton>
                </ButtonsDiv>
            </StyledBox>
          )
          }
        </StyledModal>
      </>
    );
  }

  const handleClose = () => setOpen(false);

  return (
    <div>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
        className="animeLeft"
      >
        <StyledBox sx={{ width: '60vw', outline: 'none'}}>
          <InfoContainer image>
            <Image src={book.imageLinks ? book.imageLinks.thumbnail : book.thumbnail}></Image>
            <ChildModal />
            <ColorButton variant="contained" info="true" href={book.infoLink} target="_blank" endIcon={<Info size="25" />}>
              Saber Mais
            </ColorButton>
            {favorite &&
              <Note >
                <span>Sua anotação: </span><p id="unstyled-modal-description">{book.favorite_description}</p>
              </Note>
            }
          </InfoContainer>
          <InfoContainer>
            <h2 id="unstyled-modal-title">{book.title}</h2>
            <p id="unstyled-modal-description">{book.description}</p>
            <StyledBox>
              <SubInfoContainer>
                { book.authors &&
                  <><span>Autores: </span><p id="unstyled-modal-description">{book.authors}</p></>
                }
                { book.publisher &&
                  <><span>Editora: </span><p id="unstyled-modal-description">{book.publisher}</p></>
                }
              </SubInfoContainer>
              <SubInfoContainer>
                { book.categories &&
                  <><span>Gêneros: </span><p id="unstyled-modal-description">{book.categories}</p></>
                }
                <span>Número de Páginas: </span><p id="unstyled-modal-description">{book.pageCount}</p>
              </SubInfoContainer>
            </StyledBox>
          </InfoContainer>
        </StyledBox>
      </StyledModal>
    </div>
  );
};

export default FavoriteModal;
