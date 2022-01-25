import React from 'react';
import { Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import styled from 'styled-components';


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

const style = {
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  p: 2,
  px: 4,
  pb: 3,
};

const Modal = (state, book) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <StyledModal
          aria-labelledby="unstyled-modal-title"
          aria-describedby="unstyled-modal-description"
          onClose={handleClose}
          BackdropComponent={Backdrop}
          open={open}
        >
          <Box sx={style}>
            <h2 id="unstyled-modal-title">Text in a modal</h2>
            <p id="unstyled-modal-description">Aliquid amet deserunt earum!</p>
          </Box>
        </StyledModal>
    </div>
  );
};

export default Modal;
