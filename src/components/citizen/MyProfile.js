import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import StarIcon from '@material-ui/icons/Star';
import { Link } from 'react-router-dom';
import Edit from '@material-ui/icons/Edit';
import InfoUser from './InfoUser';
import withFirebaseContext from '../../Firebase/withFirebaseContext';
import Coins from '../Coins';

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      error: null,
    };
  }

  componentDidMount() {
    const { firestore } = this.props;
    let docRef;
    if (localStorage.getItem('userId')) {
      docRef = firestore.doc(`usersinfo/${localStorage.getItem('userId')}`);
      this.getInfo(docRef);
    } else {
      const { auth } = this.props;
      auth.onAuthStateChanged((user) => {
        if (user) {
          docRef = firestore.doc(`usersinfo/${user.uid}`);
          this.getInfo(docRef);
        }
      });
    }
  }

  getInfo = (docRef) => {
    docRef.get().then((doc) => {
      if (doc.exists) {
        const userInfo = doc.data();
        this.setState({
          userInfo,
        });
      }
    }).catch((error) => {
      this.setState({ error });
    });
  }

  logout = () => {
    const { auth } = this.props;
    const { history } = this.props;

    auth.signOut().then(() => {
      history.push('/home');
    }, (error) => {
      console.log(error);
    });
  }

  redirect = (url) => {
    const { history } = this.props;
    history.push({
      pathname: url,
      state: { parcours: true },
    });
  }

  render() {
    const { userInfo, error } = this.state;
    const mapArray = new Array(3).fill(3);
    return (
      <div>
        <ArrowBack
          style={{ position: 'fixed', left: '10%', top: '2%' }}
          onClick={() => {
            this.redirect('/dashboard');
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h1>Mon profil</h1>
          <Link to="/changeprofile"><Edit /></Link>
        </div>
        <Coins position="center" userInfo={userInfo} />
        {mapArray.map(() => (
          <StarIcon style={{ width: '40px', height: '40px' }} />
        ))}
        {' '}
        {userInfo
          ? (
            <>
              <InfoUser getInfo={this.getInfo} userInfo={userInfo} />
              <Button
                size="large"
                type="button"
                onClick={this.logout}
                variant="contained"
                style={{
                  marginBottom: '80px',
                  width: '300px',
                }}
                className="Button"
              >
                Déconnexion
              </Button>
              {error && <p>{error.message}</p>}
            </>
          )
          : (
            <p>Loading your info</p>
          )
        }
      </div>
    );
  }
}

export default withRouter(withFirebaseContext(MyProfile));
