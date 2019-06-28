import React, { Component } from 'react';
import LargeAvatar from './LargeAvatar';
import Coins from '../Coins';
import withFirebaseContext from '../../Firebase/withFirebaseContext';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ImageUpload from './ImageUpload';


class infoUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: '',
      thematiquelist: [],
      myThematiques: [],
    };
  }

  

  render() {
    const { userInfo } = this.props;
    return (
      <Grid container justify="center">
        <Grid item xs={12}>
          {userInfo.url && <LargeAvatar img={userInfo.url} />}
        </Grid>
        <div style={{
          border: '2px solid black',
          borderRadius: "10px",
          backgroundColor: "#e6e6e6",
          margin: "20px",
          padding: "20px",
        }}>
          <Grid item xs={12}
            style={{
              marginBottom: '2px'
            }}>
            Prénom et nom :
            {' '}
            {userInfo.name}
          </Grid>
          <Grid item xs={12} style={{
            marginBottom: '2px'
          }}>
            Email :
            {' '}
            {userInfo.email && userInfo.email}
          </Grid>
          <Grid item xs={12}>
            Adresse postale :
            {' '}
            {userInfo.adress && userInfo.adress}
          </Grid>
        </div>
        <Grid item xs={12}>
          {userInfo.bio && userInfo.bio}
        </Grid>
        <Grid item xs={12}>
          <p style={{ fontWeight: 'bold' }}>Mes compétences :</p>
          {userInfo.competences && userInfo.competences.map(competence => (
            <p>{competence}</p>
          ))}
        </Grid>
      </Grid>
    );
  }
}

export default withFirebaseContext(infoUser);
