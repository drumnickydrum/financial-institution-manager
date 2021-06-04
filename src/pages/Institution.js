import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  Paper,
  TextareaAutosize,
  Typography,
} from '@material-ui/core';
import { FavoriteButton } from 'components/FavoriteButton';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router';
import { SearchResults } from 'store/SearchProvider';
import { UserInput, UserInputActions } from 'store/UserProvider';
import useStyles from './Institution.styles';

export const Institution = () => {
  const { ID } = useParams();
  const { fiList } = useContext(SearchResults);
  const { favorites } = useContext(UserInput);

  let fi = favorites[ID] || fiList.filter((item) => item.ID === ID)[0] || {};

  const mapUrl = `https://maps.google.com/maps?q=${fi.ADDRESS}%2C${fi.CITY}%2C${fi.STALP}&output=embed`;

  const classes = useStyles();
  return (
    <Container maxWidth='sm' className={classes.root}>
      <Card className={classes.card}>
        <FavoriteButton item={fi} type='text' />
        <Typography variant='h6' component='h1' align='center'>
          {fi.NAME}
        </Typography>
        <Divider />
        <List>
          <ListItem>
            <Typography variant='body2'>County: {fi.COUNTY}</Typography>
          </ListItem>
          <ListItem>
            <Typography variant='body2'>FDIC Region: {fi.FDICREGN}</Typography>
          </ListItem>
          <ListItem>
            <Typography variant='body2'>Regulatory Agency: {fi.REGAGNT}</Typography>
          </ListItem>
          <ListItem>
            <Typography variant='body2'>Established: {fi.ESTYMD}</Typography>
          </ListItem>
        </List>
        <Notes ID={ID} />
        <iframe
          className={classes.iFrame}
          title='Google Maps preview of institution location'
          src={mapUrl}
        ></iframe>
        <div className={classes.address}>
          <Typography variant='overline'>{fi.ADDRESS}</Typography>
          <br />
          <Typography variant='overline'>
            {fi.CITY},&nbsp;{fi.STALP}&nbsp;{fi.ZIP}
          </Typography>
        </div>
      </Card>
    </Container>
  );
};

const Notes = ({ ID }) => {
  const { notes } = useContext(UserInput);
  const { editNotes } = useContext(UserInputActions);

  const notesRef = useRef();

  const [newNotes, setNewNotes] = useState(notes[ID]);
  useEffect(() => {
    if (notes[ID]) setNewNotes(notes[ID]);
  }, [ID, notes]);

  const [isEditingNotes, setIsEditingNotes] = useState(false);
  useEffect(() => {
    notesRef.current && notesRef.current.focus();
  }, [isEditingNotes]);

  const enableEditNotes = () => {
    setIsEditingNotes(true);
  };

  const saveNotes = () => {
    editNotes(ID, newNotes);
    setIsEditingNotes(false);
  };

  const cancelEdits = () => {
    setNewNotes(notes[ID]);
    setIsEditingNotes(false);
  };

  const classes = useStyles();
  return (
    <Paper elevation={2} className={classes.notesContainer}>
      <Grid container direction='row' justify='space-between' alignItems='center' spacing={3}>
        <Grid item xs={6}>
          <Typography variant='h6' component='h2'>
            {institutionText.notesHeader}
          </Typography>
        </Grid>
        {isEditingNotes ? (
          <Grid item xs={6} className={classes.notesBtns}>
            <Button onClick={saveNotes}>{institutionText.saveNotesBtn}</Button>
            <Button onClick={cancelEdits}>{institutionText.cancelEditsBtn}</Button>
          </Grid>
        ) : (
          <Grid item xs={6} className={classes.notesBtns}>
            <Button onClick={enableEditNotes}>{institutionText.editNotesBtn}</Button>
          </Grid>
        )}
      </Grid>
      {isEditingNotes ? (
        <TextareaAutosize
          aria-label={institutionText.notesTextAreaLabel}
          ref={notesRef}
          rowsMin={6}
          placeholder={institutionText.notesPlaceholder}
          style={{ width: '100%' }}
          value={newNotes}
          onChange={(e) => setNewNotes(e.target.value)}
        ></TextareaAutosize>
      ) : (
        <Typography
          className={classes.notesReadOnly}
          variant='body2'
          aria-label={institutionText.notesLabel}
        >
          {notes[ID]}
        </Typography>
      )}
    </Paper>
  );
};

export const institutionText = {
  goBackBtn: 'Back to results',
  goHomeBtn: 'Back to search',
  notesHeader: 'Notes',
  notesLabel: 'Notes for this institution',
  notesTextAreaLabel: 'Edit notes for this institution',
  notesPlaceholder: 'Enter notes about this institution',
  editNotesBtn: 'EDIT',
  saveNotesBtn: 'SAVE',
  cancelEditsBtn: 'CANCEL',
};
