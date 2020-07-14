import React from 'react';
import './App.css';
import { Grid } from 'semantic-ui-react';
import Contacts from './components/Contacts';

const App = () => {
  return (
    <Grid divided='horizontly'>
      <Grid.Row columns={1}>
        <Grid.Column>
          <Contacts />
        </Grid.Column>        
      </Grid.Row>
    </Grid>
  );
};

export default App;