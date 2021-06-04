import { Button, Card, Container, TextareaAutosize, Typography } from '@material-ui/core';
import { FavoriteButton } from 'components/FavoriteButton';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router';
import { SearchResults } from 'store/SearchProvider';
import { UserInput, UserInputActions } from 'store/UserProvider';

export const Institution = () => {
  const { ID } = useParams();
  const { fiList } = useContext(SearchResults);
  const { favorites } = useContext(UserInput);

  let fi = favorites[ID] || fiList.filter((item) => item.ID === ID)[0] || {};

  const mapUrl = `https://maps.google.com/maps?q=${fi.ADDRESS}%2C${fi.CITY}%2C${fi.STALP}&output=embed`;

  return (
    <Container>
      <Card>
        <Container style={{ display: 'flex' }}>
          <Typography variant='h6'>{fi.NAME}</Typography>
          <FavoriteButton item={fi} />
        </Container>
        <Typography variant='body1'>{fi.ADDRESS}</Typography>
        <Typography variant='body1'>
          {fi.CITY},&nbsp;{fi.STALP}&nbsp;{fi.ZIP}
        </Typography>
        <iframe title='Google Maps preview of institution location' src={mapUrl}></iframe>
        <Typography variant='body2'>County: {fi.COUNTY}</Typography>
        <Typography variant='body2'>FDIC Region: {fi.FDICREGN}</Typography>
        <Typography variant='body2'>Regulatory Agency: {fi.REGAGNT}</Typography>
        <Typography variant='body2'>Established: {fi.ESTYMD}</Typography>
        <Notes ID={ID} />
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

  return (
    <Container>
      <Typography variant='h6'>{institutionText.notesHeader}</Typography>
      {isEditingNotes ? (
        <>
          <TextareaAutosize
            aria-label={institutionText.notesTextAreaLabel}
            ref={notesRef}
            rowsMin={6}
            placeholder={institutionText.notesPlaceholder}
            style={{ width: '100%' }}
            value={newNotes}
            onChange={(e) => setNewNotes(e.target.value)}
          ></TextareaAutosize>
          <Container style={{ display: 'flex' }}>
            <Button onClick={saveNotes}>{institutionText.saveNotesBtn}</Button>
            <Button onClick={cancelEdits}>{institutionText.cancelEditsBtn}</Button>
          </Container>
        </>
      ) : (
        <>
          <Typography variant='body2' aria-label={institutionText.notesLabel}>
            {notes[ID]}
          </Typography>
          <Button onClick={enableEditNotes}>{institutionText.editNotesBtn}</Button>
        </>
      )}
    </Container>
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
