import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {},
  navBtns: { display: 'flex', justifyContent: 'flex-end' },
  navBtnItem: {
    padding: '.5rem',
    '&:disabled': {
      color: 'white',
      borderBottom: '1px solid white',
      borderRadius: 0,
    },
  },
});

export default useStyles;
