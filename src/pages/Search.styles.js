import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    '& form': {
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      '& .MuiInput-root, & button': {
        margin: '1rem auto',
        width: '250px',
      },
    },
  },
});

export default useStyles;
