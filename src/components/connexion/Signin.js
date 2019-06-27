/* eslint-disable jsx-quotes */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import withFirebaseContext from '../../Firebase/withFirebaseContext';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const goodCode = "1234"

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      code: null,
      email: '',
      passwordOne: '',
      isAgent: null,
      adress: '',
      passwordTwo: '',
      error: null,
    };
  }


  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  isAgent = (event) => {
    if (event.target.value === "oui") {
      this.setState({ isAgent: true });
    } else {
      this.setState({ isAgent: false });
    }
  };

  onSubmit = (event) => {
    const { email, passwordOne, code } = this.state;
    const { auth } = this.props;
    if (code) {
      if (code === goodCode) {
        auth.createUserWithEmailAndPassword(email, passwordOne)
          .then((result) => {
            // eslint-disable-next-line prefer-destructuring
            const user = result.user;
            localStorage.setItem('userId', user.uid);
            this.users(user);
          })
          .catch((error) => {
            this.setState({ error });
          });
      } else {
        this.setState({ error: "Code administratif invalide" })
      }
    } else {
      auth.createUserWithEmailAndPassword(email, passwordOne)
        .then((result) => {
          // eslint-disable-next-line prefer-destructuring
          const user = result.user;
          localStorage.setItem('userId', user.uid);
          this.users(user);
        })
        .catch((error) => {
          this.setState({ error : error.message });
        });
    }
    event.preventDefault();
  };

  users = (user) => {
    // Récupération du Firestore grâce à context
    const { firestore } = this.props;
    const { username, email, adress, isAgent } = this.state;
    // Envoi d'infos dans le cloud Firestore
    firestore.doc(`usersinfo/${user.uid}`).set({
      name: username,
      email,
      adress,
      isAgent,
      uid: user.uid,
    }, { merge: true });
    const { history } = this.props;
    history.push('/dashboard');
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      adress,
      code,
      isAgent,
      error,
    } = this.state;
    const isInvalid = passwordOne !== passwordTwo
      || passwordOne === ''
      || isAgent === null
      || adress === ''
      || email === ''
      || username === '';
    return (
      <div className="emailLog" style={{ color: 'black' }}>
        <h1>S'inscrire</h1>
        <form onSubmit={this.onSubmit} className="classesContainer" autoComplete="off">
          <Grid container>
            <Grid item xs={12}>
              <TextField
                required
                id="name"
                label="Prénom et nom"
                name="username"
                className='textfield'
                value={username}
                onChange={this.onChange}
                style={{ marginTop: '5%', width: '50%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="adresse"
                label="Adresse postale"
                name="adress"
                className='textfield'
                value={adress}
                onChange={this.onChange}
                style={{ marginTop: '5%', width: '50%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="email"
                label="Adresse email"
                name="email"
                className='textfield'
                currentValue={email}
                onChange={this.onChange}
                style={{ marginTop: '5%', width: '50%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="password"
                label="Mot de passe"
                name="passwordOne"
                className='textfield'
                value={passwordOne}
                type="password"
                onChange={this.onChange}
                style={{ marginTop: '5%', width: '50%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="password"
                label="Confirmer le mot de passe"
                name="passwordTwo"
                className='textfield'
                value={passwordTwo}
                type="password"
                onChange={this.onChange}
                style={{ marginTop: '5%', width: '50%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset" style={{ marginTop: '5%', width: '50%' }}>
                <FormLabel component="legend">Êtes-vous un agent public ?</FormLabel>
                <RadioGroup
                  aria-label="Agent"
                  name="isAgent"
                  value={isAgent}
                  onChange={this.isAgent}
                >
                  <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                  <FormControlLabel value="non" control={<Radio />} label="Non" />
                </RadioGroup>
              </FormControl>
            </Grid>
            {isAgent &&
              <Grid item xs={12}>
                <p>Code fourni par votre administration</p>
                <TextField
                  required
                  id="code"
                  label="Indiquer le code"
                  name="code"
                  className='textfield'
                  value={code}
                  type="password"
                  onChange={this.onChange}
                  style={{ marginTop: '5%', width: '50%' }}
                />
              </Grid>
            }
            <Grid item xs={12}>
              <Button
                size="large"
                disabled={isInvalid}
                type="submit"
                variant="contained"
                style={{ marginTop: '8%' }}
                className="Button"
              >
                S'inscrire
              </Button>
            </Grid>
          </Grid>
          {error && <p>{error}</p>}
        </form>
        <p><Link to="/connect">Vous avez déjà un compte ?</Link></p>
      </div>
    );
  }
}

export default withRouter(withFirebaseContext(Signup));
