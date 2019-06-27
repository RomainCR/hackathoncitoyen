import React, { Component } from 'react';
import LargeAvatar from './LargeAvatar';
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
      thématiquelist: [],
      myThematiques: [],
    };
  }

  componentDidMount() {
    this.getThématiqueFromDB();
  }

  getThématiqueFromDB = () => {
    const { firestore } = this.props;

    const themRef = firestore.collection('category').doc('thématique');
    const thématique = [];
    themRef.get().then((document) => {
      const dbCategory = document.data();

      for (const [, value] of Object.entries(dbCategory)) {
        thématique.push(`${value}`);
      }

      this.setState({
        thématiquelist: thématique,
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
    const thématiques = myThematiques;
    let index;

    // check if the check box is checked or unchecked
    if (e.target.checked) {
      // add the numerical value of the checkbox to options array
      thématiques.push(e.target.value);
      console.log(thématiques);
    } else {
      // or remove the value from the unchecked checkbox from the array
      index = thématiques.indexOf(e.target.value);
      thématiques.splice(index, 1);
    }
    // update the state with the new array of options
    this.setState({ myThematiques: thématiques });
  }


  render() {
    const { userInfo } = this.props;
    const { bio, thématiquelist } = this.state;
    return (
      <Grid container style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <Grid item xs={12}>
          {userInfo.url ? <LargeAvatar img={userInfo.url} /> : <ImageUpload getImage={this.getImage} />}
        </Grid>
        <div style={{ border: '2px solid black', borderRadius: "10px" }}>
          <Grid item xs={12}>
            Prénom et nom :
            {' '}
            {userInfo.name}
          </Grid>
          <Grid item xs={12}>
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
                {thématiquelist.length > 0 && thématiquelist.map(thématique => (
                  <>
                    <div className="input-group">
                      <label>{thématique}</label>
                      <input type="checkbox" value={thématique} onChange={this.handleChange} />
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
      </Grid>
    );
  }
}

export default withFirebaseContext(infoUser);
