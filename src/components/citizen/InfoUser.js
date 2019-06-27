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

  componentDidMount() {
    this.getthematiqueFromDB();
  }

  getthematiqueFromDB = () => {
    const { firestore } = this.props;

    const themRef = firestore.collection('category').doc('thematique');
    const thematique = [];
    themRef.get().then((document) => {
      const dbCategory = document.data();

      for (const [, value] of Object.entries(dbCategory)) {
        thematique.push(`${value}`);
      }

      this.setState({
        thematiquelist: thematique,
      });
    });
  };

  getImage = (url) => {
    const { firestore, getInfo } = this.props;
    firestore.doc(`usersinfo/${localStorage.getItem('userId')}`).set({
      url,
    }, { merge: true });
    const docRef = firestore.doc(`usersinfo/${localStorage.getItem('userId')}`);
    getInfo(docRef);
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onAdd = (added) => {
    const { firestore, getInfo } = this.props;
    const {
      bio, myThematiques,
    } = this.state;

    if (added === 'bio' && bio) {
      firestore.doc(`usersinfo/${localStorage.getItem('userId')}`).set({
        bio,
      }, { merge: true });
      const docRef = firestore.doc(`usersinfo/${localStorage.getItem('userId')}`);
      getInfo(docRef);
    }
    if (added === 'competences' && myThematiques.length > 0) {
      firestore.doc(`usersinfo/${localStorage.getItem('userId')}`).set({
        competences: myThematiques,
        hasCompetences: true,
      }, { merge: true });
      const docRef = firestore.doc(`usersinfo/${localStorage.getItem('userId')}`);
      getInfo(docRef);
    }
  }

  handleChange = (e) => {
    // current array of options
    const { myThematiques } = this.state;
    const thematiques = myThematiques;
    let index;

    // check if the check box is checked or unchecked
    if (e.target.checked) {
      // add the numerical value of the checkbox to options array
      thematiques.push(e.target.value);
      console.log(thematiques);
    } else {
      // or remove the value from the unchecked checkbox from the array
      index = thematiques.indexOf(e.target.value);
      thematiques.splice(index, 1);
    }
    // update the state with the new array of options
    this.setState({ myThematiques: thematiques });
  }


  render() {
    const { userInfo } = this.props;
    const { bio, thematiquelist } = this.state;
    return (
      <Grid container justify="center">
        <Grid item xs={12}>
          {userInfo.url ? <LargeAvatar img={userInfo.url} /> : <ImageUpload getImage={this.getImage} />}
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
            marginBottom: '2px'}}>
            Prénom et nom :
            {' '}
            {userInfo.name}
          </Grid>
          <Grid item xs={12} style={{
            marginBottom: '2px'}}>
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
          {userInfo.bio ? (
            <div>
              <p style={{ fontWeight: 'bold' }}>
                Ma présentation :
              </p>
              {userInfo.bio}
            </div>
          )
            : (
              <>
                <p style={{ fontWeight: 'bold' }}>
                  Ajouter un texte de présentation :
                </p>
                <TextField
                  id="standard-multiline-flexible"
                  name="bio"
                  onChange={this.onChange}
                  value={bio}
                  label="A propos de moi"
                  multiline
                  rowsMax="4"
                  className="textField"
                  style={{ width: '50%' }}
                />
                <Button
                  variant="outlined"
                  name="changeprofile"
                  className="Button"
                  onClick={() => this.onAdd('bio')}
                  style={{
                    margin: '30px 0 30px 0',
                    width: '300px',
                  }}
                >
                  Ajouter
                </Button>
              </>
            )
          }
        </Grid>
        <Grid item xs={12}>
          {userInfo.competences ? (
            <>
              <p style={{ fontWeight: 'bold' }}>Mes compétences :</p>
              {userInfo.competences.map(competence => (
                <>
                  <p>{competence}</p>
                </>
              ))}
            </>
          )
            : (
              <form>
                <p style={{ fontWeight: 'bold' }}>Indiquer mes compétences :</p>
                {thematiquelist.length > 0 && thematiquelist.map(thematique => (
                  <>
                    <div className="input-group">
                      <label style={{ fontSize: '1.2em' }}>{thematique}</label>
                      <input style={{ transform: 'scale(1.3)' }} type="checkbox" value={thematique} onChange={this.handleChange} />
                    </div>
                  </>
                ))}
                <Button
                  variant="outlined"
                  name="changeprofile"
                  className="Button"
                  onClick={() => this.onAdd('competences')}
                  style={{
                    margin: '30px 0 30px 0',
                    width: '300px',
                  }}
                >
                  Ajouter
                </Button>
              </form>
            )}
        </Grid>
      </Grid >
    );
  }
}

export default withFirebaseContext(infoUser);
