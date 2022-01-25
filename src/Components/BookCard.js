import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { FavoriteBorder } from '@styled-icons/material/FavoriteBorder';
import Modal from './Modal';

const StyledCard = styled(Card)`
  border-radius: 30px !important;
  box-shadow: none !important;
  box-shadow: 0.5px 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.1) !important;
  margin: 15px;
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
  const handleOpen = () => {
    setOpen(true);
  };
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
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="add to favorites">
            <FavoriteBorder size="30"></FavoriteBorder>
          </IconButton>
          <Button size="small">Saber mais</Button>
        </CardActions>
      </StyledCard>
      </CardDiv>
    </>
  );
};

export default BookCard;
