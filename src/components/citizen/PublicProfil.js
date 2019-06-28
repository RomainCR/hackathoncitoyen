import React, { Component } from 'react';
import InfoUserPublic from './InfoUserPublic';
import withFirebaseContext from '../../Firebase/withFirebaseContext';
import StarIcon from '@material-ui/icons/Star';
import Button from '@material-ui/core/Button';

class PublicProfil extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.user = match.params.uid;
    this.state = {
      userInfo: {},
    };
  }

  componentDidMount() {
    const { firestore } = this.props;
    const docRef = firestore.doc(`usersinfo/${this.user}`);
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
    return (
      <>
        <h1>Profil de
          {' '}
          {userInfo && userInfo.name}
        </h1>
        <InfoUserPublic userInfo={userInfo} />
        <a href={`mailto:${userInfo && userInfo.email}`}>
          <Button
            size="large"
            type="button"
            variant="contained"
            style={{ marginTop: '2%', marginBottom: '80px' }}
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
