import React, { Component } from 'react';
import ListAnnonce from '../dashboard/ListAnnonce';
import withFirebaseContext from "../../Firebase/withFirebaseContext";

class Signalements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      annonces: [],
    };
    this.getAnnounceFromDB();
  }

  getAnnounceFromDB = () => {
    const annonces = [];
    const { firestore } = this.props;
    firestore
      .collection('annoncesUser')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          annonces.push({ data: doc.data(), id: doc.id });
        });
        this.setState({
          annonces,
        });
      });
  };

  render() {
    const { annonces } = this.state;
    return (
      <div>
        <h1>Les suggestions et signalements des citoyens</h1>
        {annonces && annonces
          .map(annonce => (
            <div key={Math.random().toString(36)}>
              <ListAnnonce nolink annonce={annonce} />
            </div>
          ))}
      </div>
    );
  }
}

export default withFirebaseContext(Signalements);
