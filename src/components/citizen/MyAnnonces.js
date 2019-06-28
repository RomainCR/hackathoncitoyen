import React, { Component } from 'react';
import ListAnnonce from '../dashboard/ListAnnonce';
import withFirebaseContext from '../../Firebase/withFirebaseContext';
import * as firebase from 'firebase';

class MyAnnonces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      annonces: [],
    };
  }

  componentDidMount() {
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
    return (
      <div>
        {annonces.length > 0 && annonces.map(annonce => annonce.data.postulants)
          .map(annonce => annonce.map(one => one.id)
          .map(id => id === localStorage.getItem('userId'))).map(test => console.log(test))}         
      </div>
    );
  }
}

export default withFirebaseContext(MyAnnonces);
