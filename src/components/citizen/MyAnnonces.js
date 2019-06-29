import React, { Component } from 'react';
import ListAnnonce from '../dashboard/ListAnnonce';
import withFirebaseContext from '../../Firebase/withFirebaseContext';
import * as firebase from 'firebase';

class MyAnnonces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      annonces: [],
      myannonces: [],
    };
  }

  componentDidMount() {
    this.getInfo();
    this.getAnnounceFromDB();
  }

  getInfo = () => {
    const { firestore, auth } = this.props;
    let docRef;
    if (localStorage.getItem('userId')) {
      docRef = firestore.doc(`usersinfo/${localStorage.getItem('userId')}`);
      auth.onAuthStateChanged((user) => {
        if (user) {
          docRef = firestore.doc(`usersinfo/${user.uid}`);
          docRef.get().then((doc) => {
            if (doc.exists) {
              const userInfo = doc.data();
              this.setState({
                myannonces: userInfo.candidatures,
              });
            }
          });
        }
      });
    } else {
      auth.onAuthStateChanged((user) => {
        if (user) {
          docRef = firestore.doc(`usersinfo/${user.uid}`);
          docRef.get().then((doc) => {
            if (doc.exists) {
              const userInfo = doc.data();
              this.setState({
                myannonces: userInfo.candidatures,
              });
            }
          });
        }
      });
    }
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
    const { annonces, myannonces } = this.state;
    return (
      <div>
        <h1>Les annonces auxquelles j&apos;ai postulé</h1>
        {annonces.length > 0 && annonces.filter(annonce => myannonces.includes(annonce.id))
          .map(annonce => (
            <ListAnnonce annonce={annonce} />
          ))}
      </div>
    );
  }
}

export default withFirebaseContext(MyAnnonces);
