import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import withFirebaseContext from '../../Firebase/withFirebaseContext';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class Connect extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, password } = this.state;
    const { auth } = this.props;
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            localStorage.setItem('userId', user.uid);
          }
        });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        const { history } = this.props;
        history.push('/dashboard');
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };


  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';

    return (
      <>
        <h1>Se connecter</h1>
        <form onSubmit={this.onSubmit}>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                required
                name="email"
                label="Email Address"
                className="textfield"
                currentValue={email}
                onChange={this.onChange}
                style={{ marginTop: '5%', width: '50%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name="password"
                label="password"
                className="textfield"
                currentValue={password}
                type="password"
                onChange={this.onChange}
                style={{ marginTop: '5%', width: '50%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                size="large"
                style={{marginTop: '8%'}}
                disabled={isInvalid}
                type="submit"
                variant="contained"
                className="Button"
              >
                Se connecter
              </Button>
            </Grid>
          </Grid>
          {error && <p>{error.message}</p>}
        </form>
        <p><Link to="/reset">Mot de passe oublié?</Link></p>
      </>
    );
  }
}
export default withRouter(withFirebaseContext(Connect));
