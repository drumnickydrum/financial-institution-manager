import { Button, Card, Container, TextareaAutosize, Typography } from '@material-ui/core';
import { PATHS } from 'App';
import { FavoriteButton } from 'components/FavoriteButton';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useHistory, useParams } from 'react-router';
import { SearchResults } from 'store/SearchProvider';
import { UserInput, UserInputActions } from 'store/UserProvider';

export const Institution = () => {
  const history = useHistory();

  const { ID } = useParams();
  const { fiList } = useContext(SearchResults);
  const { notes } = useContext(UserInput);
  const { editNotes } = useContext(UserInputActions);

  const [newNotes, setNewNotes] = useState(notes[ID]);
  useEffect(() => {
    if (notes[ID]) setNewNotes(notes[ID]);
  }, [ID, notes]);

  const fi = fiList.filter((item) => item.ID === ID)[0];
  const mapUrl = `https://maps.google.com/maps?q=${fi?.ADDRESS}%2C${fi?.CITY}%2C${fi?.STALP}&output=embed`;

  const goBack = () => {
    history.push(PATHS.RESULTS);
  };

  const goHome = () => {
    history.push(PATHS.SEARCH);
  };

  const saveNotes = () => editNotes(ID, newNotes);

  return (
    <Container>
      <Container style={{ display: 'flex' }}>
        <Button variant='contained' color='primary' onClick={goHome}>
          {institutionText.goHomeBtn}
        </Button>
        <Button variant='contained' color='secondary' onClick={goBack}>
          {institutionText.goBackBtn}
        </Button>
      </Container>
      <Card>
        <Container style={{ display: 'flex' }}>
          <Typography variant='h6'>{fi?.NAME}</Typography>
          <FavoriteButton item={fi} />
        </Container>
        <Typography variant='body1'>{fi?.ADDRESS}</Typography>
        <Typography variant='body1'>
          {fi?.CITY},&nbsp;{fi?.STALP}&nbsp;{fi?.ZIP}
        </Typography>
        <iframe src={mapUrl}></iframe>
        <Typography variant='body2'>County: {fi?.COUNTY}</Typography>
        <Typography variant='body2'>FDIC Region: {fi?.FDICREGN}</Typography>
        <Typography variant='body2'>Regulatory Agency: {fi?.REGAGNT}</Typography>
        <Typography variant='body2'>Established: {fi?.ESTYMD}</Typography>
        <TextareaAutosize
          rowsMin={4}
          placeholder={institutionText.notesPlaceholder}
          style={{ width: '100%' }}
          value={newNotes}
          onChange={(e) => setNewNotes(e.target.value)}
        ></TextareaAutosize>
        <Button onClick={saveNotes}>SAVE</Button>
      </Card>
    </Container>
  );
};

const institutionText = {
  goBackBtn: 'Back to results',
  goHomeBtn: 'Back to search',
  notesPlaceholder: 'Enter notes about this institution',
};
