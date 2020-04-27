import React from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';

import AppHeader from './components/AppHeader';
import Map from "./components/Map";

function App(){
  return (
    <div className="App">
      <Grid container direction='row' spacing={5} justify="center"
  alignItems="center">
        <Grid item xs={2}className="footer">
            Data from <a href="https://github.com/pomber/covid19">JHU CSSE</a><br/>Made by <a href='https://cardorelle.io'>cardorelle.io</a>
        </Grid>
      <Grid item xs={8}>
        <AppHeader/>
      </Grid>
      <Grid item xs={2}>
      </Grid>
       <Grid item xs={2}>
       </Grid>
       <Grid item xs={8}>
        <Map/>
       </Grid>
       <Grid item xs={2}>
       </Grid>
     </Grid>
    </div>
  );
}

export default App;
