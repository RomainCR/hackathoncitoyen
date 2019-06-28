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
    console.log(annonces && annonces[0] && annonces[0].data)
    return (
      <div>
        {annonces && annonces.filter(annonce => annonce.data.postulants.map(e => e.id === localStorage.getItem('userId')))
            .map(annonce => (
              <div key={annonce.data.createur}>
                <ListAnnonce annonce={annonce} />
              </div>
            ))}
      </div>
    );
  }
}

export default withFirebaseContext(MyAnnonces);
