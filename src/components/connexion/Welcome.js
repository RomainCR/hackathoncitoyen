import React, { Component } from 'react';
import { withRouter } from 'react-router';
import withFirebaseContext from '../../Firebase/withFirebaseContext';


class Welcome extends Component {
  componentDidMount() {
    const { auth } = this.props;
    auth.onAuthStateChanged((user) => {
      if (user) {
        const { history } = this.props;
        localStorage.setItem('userId', user.uid);
        history.push('/dashboard');
      } else {
        const { history } = this.props;
        history.push('/home');
      }
    });
  }

  render() {
    return (
      <div className="home" style={{ color: 'black' }}>
        <p>Loading the app...</p>
      </div>
    );
  }
}

export default withRouter(withFirebaseContext(Welcome));
