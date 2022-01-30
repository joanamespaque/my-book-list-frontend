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
import { Favorite } from '@styled-icons/material/Favorite';
import FavoriteModal from './FavoriteModal';

const StyledCard = styled(Card)`
  border-radius: 30px !important;
  box-shadow: none !important;
  box-shadow: 0.5px 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.1) !important;
  margin: 15px;
  height: 380px !important;
  @media(max-width: 500px) {
    height: 53vh !important;
  }

`;
const CardDiv = styled.div`
  cursor: pointer;
  &:hover {
    outline: none;
    transform: scale(1.1);
    transition: all 0.3s;
  }
`;

const BookCard = ({ book, favorite }) => {
  const [open, setOpen] = React.useState(false);
  const [handleFavorite, setHandleFavorite] = React.useState(false);
  const handleShow = () => setOpen(true);

  return (
    <>
      { open &&
        <FavoriteModal book={book} setOpen={setOpen} open={open} handleFavorite={handleFavorite} favorite={favorite} setHandleFavorite={setHandleFavorite}></FavoriteModal>
      }
      <CardDiv onClick={handleShow}>
        <StyledCard sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={book.imageLinks ? book.imageLinks.thumbnail : book.thumbnail}
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
          <IconButton aria-label="add to favorites" id={book.id} onClick={() => setHandleFavorite(true)}>
            {favorite ?
              <Favorite size="30" color='#EF9C17'></Favorite>
              :
              <FavoriteBorder size="30" ></FavoriteBorder>
            }
          </IconButton>
          <Button size="small" href={book.infoLink} target="_blank">Saber mais</Button>
        </CardActions>
      </StyledCard>
      </CardDiv>
    </>
  );
};

export default BookCard;
