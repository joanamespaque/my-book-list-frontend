import React, { useEffect } from 'react';
import styled from 'styled-components';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { FavoriteBorder } from '@styled-icons/material/FavoriteBorder';
import { BOOK_POST } from '../Api';
import useFetch from '../Hooks/useFetch';
import Modal from './Modal';

const StyledCard = styled(Card)`
  border-radius: 30px !important;
  box-shadow: none !important;
  box-shadow: 0.5px 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.1) !important;
  margin: 15px;
  height: 380px !important;
`;
const CardDiv = styled.div`
  cursor: pointer;
  &:hover {
    outline: none;
    transform: scale(1.1);
    transition: all 0.3s;
  }
`;

const BookCard = ({ book }) => {
  const [open, setOpen] = React.useState(false);
  const [description, setDescription] = React.useState(false);
  const { data, error, request } = useFetch();
  const handleOpen = () => {
    setOpen(true);
  };

  async function postBook() {
    const data = {
      title: book.title,
      description: book.description,
      favorite_description: description,
      book_id: book.id,
      authors: book.authors,
      publisher: book.publisher,
      infoLink: book.infoLink,
      categories: book.categories,
      publishedDate: book.publishedDate,
      pageCount: book.pageCount,
      thumbnail: book.thumbnail
    }
    const { url, options } = BOOK_POST(data);
    const { json } = await request(url, options);
    return json;
  }
  function handleFavorite ({target}) {
    
  }

  return (
    <>
      { open &&
        <Modal book={book} state={open}></Modal>
      }
      <CardDiv onClick={handleOpen}>
        <StyledCard sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={book.imageLinks.thumbnail}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {book.description.substring(0, 150)} [...]
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="add to favorites" onClick={handleFavorite} id={book.id}>
            <FavoriteBorder size="30" ></FavoriteBorder>
          </IconButton>
          <Button size="small">Saber mais</Button>
        </CardActions>
      </StyledCard>
      </CardDiv>
    </>
  );
};

export default BookCard;
