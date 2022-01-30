import React from 'react';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import styled, { css } from 'styled-components';
import DescriptionField from './DescriptionField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { BOOK_POST } from '../Api';
import useFetch from '../Hooks/useFetch';
import { FavoriteBorder } from '@styled-icons/material/FavoriteBorder';
import { Info } from '@styled-icons/material/Info';
// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   pt: 2,
//   px: 4,
//   pb: 3,
// };


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
`;

const ButtonsDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
`;

const FavoriteModal = ({state, book, setOpen, open, handleFavorite}) => {
  function ChildModal() {
    const [open, setOpen] = React.useState(handleFavorite ? true : false);
    const [description, setDescription] = React.useState('');
    const { data, error, request } = useFetch();
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const handleChange = ({ target }) => {
      setDescription(target.value);
    };

    async function handleSubmit () {
      // const data = {
      //   title: book.title,
      //   book_description: description,
      //   description: book.description,
      //   favorite_description: description,
      //   book_id: book.id,
      //   authors: book.authors,
      //   publisher: book.publisher,
      //   infoLink: book.infoLink,
      //   categories: book.categories,
      //   publishedDate: book.publishedDate,
      //   pageCount: book.pageCount,
      //   thumbnail: book.thumbnail
      // }
      // const { url, options } = BOOK_POST(data);
      // const { json } = await request(url, options);
      // return json;
    }
    return (
      <>
        <ColorButton onClick={handleOpen} variant="contained" endIcon={<FavoriteBorder size="25" />}>
          Favoritar
        </ColorButton>
        <StyledModal
          BackdropComponent={Backdrop}
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
          >
          <StyledBox sx={{p:5, display:'flex', flexDirection: 'column'}}>
              <h2 id="child-modal-title">Favoritar Livro</h2>
              <DescriptionField handleChange={handleChange}></DescriptionField>
              <ButtonsDiv>
                <ColorButton variant="contained" info="true" target="_blank" onClick={handleClose} outlined="true">
                  Cancelar
                </ColorButton>
                <ColorButton variant="contained" info="true" target="_blank" onClick={handleSubmit}>
                  Favoritar
                </ColorButton>
              </ButtonsDiv>
          </StyledBox>
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
            <Image src={book.imageLinks.thumbnail}></Image>
            <ChildModal />
            <ColorButton variant="contained" info="true" href={book.infoLink} target="_blank" endIcon={<Info size="25" />}>
              Saber Mais
            </ColorButton>
          </InfoContainer>
          <InfoContainer>
            <h2 id="unstyled-modal-title">{book.title}</h2>
            <p id="unstyled-modal-description">{book.description}</p>
            <StyledBox>
              <SubInfoContainer>
                <span>Autores: </span><p id="unstyled-modal-description">{book.authors}</p>
                <span>Editora: </span><p id="unstyled-modal-description">{book.publisher}</p>
              </SubInfoContainer>
              <SubInfoContainer>
                <span>Gêneros: </span><p id="unstyled-modal-description">{book.categories}</p>
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
