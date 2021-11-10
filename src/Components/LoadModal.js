import {Modal,Box, Typography} from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 230,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


const LoadModal = (props) => {
    return(
        <Modal open={props.open}>
            <Box sx={style}>
                <Typography variant="h9">Haetaan dataa, odota hetki...</Typography>
            </Box>
            
        </Modal>
    )
}

export default LoadModal;