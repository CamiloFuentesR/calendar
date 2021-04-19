// import React, { useState } from 'react'
// import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseSuccesM } from '../../actions/uiActions';


export const SuccessMessage = () => {

    const dispatch = useDispatch();

    const {successMessage} = useSelector(state => state.root.ui)
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }
      
      const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
          '& > * + *': {
            marginTop: theme.spacing(2),
          },
        },
      }));
      
        const classes = useStyles();
        // const [open, setOpen] = useState(false);
      
       /*  const handleClick = () => {
          setOpen(successMessage);
        }; */
      
        const handleClose = (event, reason) => {
            
          if (reason === 'clickaway') {
            return;
          }
      
          dispatch(uiCloseSuccesM());
        //   setOpen(successMessage);
        };


    return (
        <div className={classes.root}>
        {/* <Button variant="outlined" onClick={handleClick}>
          Open success snackbar
        </Button> */}
        <Snackbar 
            open={successMessage} 
            autoHideDuration={2400} 
            onClose={handleClose}
            anchorOrigin={{vertical:'top',horizontal:'center'}}
            >
          <Alert onClose={handleClose} severity="success">
            Evento guardado con éxito
          </Alert>
        </Snackbar>
      </div>
    )
}
