import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    '& form': {
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      '& .Mui-error': {
        textAlign: 'center',
      },
    },
  },
  searchBtn: {
    display: 'block',
    margin: '1rem auto',
    width: '250px',
  },
  favBtn: {
    display: 'block',
    margin: '1rem auto',
    width: '250px',
  },
});

export default useStyles;
