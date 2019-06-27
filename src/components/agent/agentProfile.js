import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import withFirebaseContext from '../../Firebase/withFirebaseContext';


class agentProfile extends Component {
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
      history.push('/signin');
    }, (error) => {
      console.log(error);
    });
  }

  render() {
    const { userInfo, error } = this.state;
    return (
      <div>
        <Button
          size="large"
          type="button"
          onClick={this.logout}
          variant="contained"
          style={{
            margin: '30px 0 30px 0',
            width: '300px',
          }}
          className="Button"
        >
          Log Out
        </Button>
      </div>
    );
  }
}

export default withFirebaseContext(agentProfile);
