import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import './Home.css';

import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className="home" style={{ color: 'black' }}>
        <img src="./assets/logo.png" className="logo" alt="logo" />
        <h1 style={{ margin: '1%' }}>Unicity</h1>
        <h3 style={{ margin: '1%' }}>Help your city, help yourself</h3>
        <Grid container>
          <Grid item xs={12}>
            <Link to="/signin" style={{ textDecoration: 'none' }}>
              <Button
                variant="outlined"
                style={{
                  marginTop: '10px',
                  marginBottom: '10px',
                  width: '300px',
                  borderRadius:'10px'
                }}
                className="Button"
              >
                S'inscrire
            </Button>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Link to="/connect" style={{ textDecoration: 'none' }}>
              <Button
                variant="outlined"
                style={{
                  marginTop: '10px',
                  marginBottom: '20px',
                  width: '300px',
                  borderRadius:'10px'
                }}
                className="Button"
              >
                Se connecter
            </Button>
            </Link>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Home;