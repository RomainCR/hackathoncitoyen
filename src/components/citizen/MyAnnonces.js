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
    console.log((annonces && annonces[0] && annonces[0]), 'annonces');
    console.log((annonces && annonces[0] && annonces[0].data.postulants), 'ann');
    return (
      <div>
        {annonces && annonces.map(annonce => annonce.data.postulants
          .filter(x => (localStorage.getItem('userId') === x.id))
          .map(y => (
            <div key={y}>
              <h1>{annonce.data.titre}</h1>
              <p>{annonce.data.description}</p>
            </div>
          )))}
      </div>
    );
  }
}

export default withFirebaseContext(MyAnnonces);

{ /* <div>
        {annonces && annonces.map(annonce => annonce.data.postulants)
          .map(x => (x
            .map(y => (y.id)
              .includes(localStorage.getItem('userId')))))}
      </div>

    {annonces && annonces.map(annonce => annonce.data.postulants
          .filter(x => (localStorage.getItem('userId') === x.id))
          .map(y => (
            <div key={y}>
              {console.log(annonce.data.titre, 'log')
              }
              <h1>{annonce.data.titre}</h1>
              <h2>bla</h2>
              <p>{annonce.data.description}</p>

            </div>
          )))}

    */ }
