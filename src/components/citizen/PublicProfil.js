import React, { Component } from 'react';
import InfoUser from './InfoUser';
import withFirebaseContext from '../../Firebase/withFirebaseContext';
import StarIcon from '@material-ui/icons/Star';
import Button from '@material-ui/core/Button';

class PublicProfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {}
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
    });
  }

  render() {
    const { userInfo } = this.state;
    const mapArray = new Array(3).fill(3);
    return (
      <>
        <h1>Profil de
          {' '}
          {userInfo && userInfo.name}
        </h1>
        {mapArray.map(() => (
          <StarIcon style={{ width: '40px', height: '40px' }} />
        ))}
        <InfoUser userInfo={userInfo} />
        <a href={`mailto:${userInfo && userInfo.email}`}>
          <Button
            size="large"
            type="button"
            variant="contained"
            style={{ marginTop: '2%' }}
            className="Button"
          >
            Contacter
          </Button>
        </a>
      </>
    );
  }
}

export default withFirebaseContext(PublicProfil);
