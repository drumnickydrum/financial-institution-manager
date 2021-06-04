import { Card, Container, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from './ResultsPending.styles';

export const ResultsPending = () => {
  return (
    <Container maxWidth='sm'>
      <Typography variant='h6' component='h1' align='center'>
        {resultsPendingText}
      </Typography>
      <FiItem />
      <FiItem />
      <FiItem />
      <FiItem />
    </Container>
  );
};

const FiItem = () => {
  const classes = useStyles();
  return (
    <div className={classes.skeletonContainer}>
      <Skeleton
        className={classes.skeletonText}
        variant='text'
        animation='wave'
        style={{ width: 70 + Math.random() * 30 + '%' }}
      />
      <Skeleton
        className={classes.skeletonText}
        variant='text'
        animation='wave'
        style={{ width: 70 + Math.random() * 30 + '%' }}
      />
      <Skeleton
        className={classes.skeletonText}
        variant='text'
        animation='wave'
        style={{ width: 70 + Math.random() * 30 + '%' }}
      />
    </div>
  );
};

export const resultsPendingText = 'Results Pending';
