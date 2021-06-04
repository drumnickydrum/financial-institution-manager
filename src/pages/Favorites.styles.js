import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {},
  card: {
    cursor: 'pointer',
    padding: '1rem',
    border: '1px solid rgba(0,0,0,0)',
    '&:hover': {
      border: '1px solid white',
    },
  },
  name: {
    fontWeight: 'bold',
  },
  notesBox: {
    marginTop: '1rem',
    padding: '1rem',
    border: '1px solid grey',
    borderRadius: '8px',
  },
  notes: {
    padding: '.5rem !important',
    height: '100px',
    overflowX: 'hidden',
    overflowY: 'scroll',
  },
  clearAllBtn: {
    display: 'block',
    margin: '1rem auto',
  },
});

export default useStyles;
