import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {},
  nearbyBtn: {
    display: 'block',
    margin: '1rem auto',
  },
  card: {
    cursor: 'pointer',
    display: 'flex',
    margin: '10px',
    padding: '10px',
    '& .MuiTypography-body1': {
      paddingBottom: '.25rem',
      fontWeight: 'bold',
    },

    '&:hover': {
      borderColor: 'white',
    },
  },
}));

export default useStyles;
