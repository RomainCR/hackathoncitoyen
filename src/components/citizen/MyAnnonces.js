import React, { Component } from 'react';
import * as firebase from 'firebase';
import ListAnnonce from '../dashboard/ListAnnonce';
import withFirebaseContext from '../../Firebase/withFirebaseContext';

class MyAnnonces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      annonces: [],
    };
    this.getAnnounceFromDB();
  }

  getAnnounceFromDB = () => {
    const annonces = [];
    firebase
      .firestore()
      .collection('annonces')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          annonces.push({ data: doc.data(), id: doc.id });
        });
        this.setState({
          annonces,
        });
      });
    this.setState({
      annonces,
    });
  };

  render() {
    const { annonces } = this.state;
    // console.log((annonces && annonces[0] && annonces[0].data.postulants).map(x => x), 'ann');
    return (
      <div />
    );
  }
}

export default withFirebaseContext(MyAnnonces);
