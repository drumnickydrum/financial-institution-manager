import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {},
  card: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    position: 'relative',
    '& button': {
      position: 'absolute',
      right: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
    },
  },
  address: {
    padding: '1rem',
    textAlign: 'center',
  },
  iFrame: {
    border: 'none',
  },
  notesContainer: {
    padding: '1rem',
    marginBottom: '2rem',
    width: '100%',
  },
  notesReadOnly: {
    wordWrap: 'break-word',
  },
  notesBtns: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

export default useStyles;
