import React, { Component } from "react";
import * as firebase from "firebase";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

class ApplyList extends Component {
  constructor(props) {
    super(props);
    this.state = { applyList: [], postulants: [], users: [], match: [] };
  }

  componentDidMount() {
    this.findUserProfile();
    const { id } = this.props
    const annonceRef = firebase.firestore().collection("annonces").doc(id);
    annonceRef.get().then((document) => {
      const annonce = document.data();
      console.log(annonce)
      if (annonce.inProgress === true) {
        this.setState({
          engaged: true,
          message: 'Mission en cours de réalisation',
          ended: false,
        });
      } else if (annonce.over === true) {
        this.setState({
          engaged: true,
          message: 'Mission finie',
          ended: true,
        });
      }
    });
  }

  findUserProfile = () => {
    const users = [];
    firebase
      .firestore()
      .collection("usersinfo")

      .get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          users.push(doc.data());
        });

        this.setState({
          users
        });
      })
      .then(() => {
        this.findUser();
      });
  };

  updateToInProgress = (name) => {

    const { id } = this.props;

    const annonceRef = firebase.firestore().collection("annonces").doc(id);
    annonceRef.update({
      inProgress: true

    });
    this.setState({
      message: `${name} a été engagé !`,
      engaged: true
    });
  };

  updateOver = (uid) => {

    const { id, annonce } = this.props;
    const value = parseInt(annonce[0].points, 10);

    firebase.firestore().doc(`usersinfo/${uid}`).update({
      credits: firebase.firestore.FieldValue.increment(value),
    });

    const annonceRef = firebase.firestore().collection("annonces").doc(id);
    annonceRef.update({
      inProgress: false,
      over: true,
    });
    this.setState({
      message: `Mission finie !`,
      engaged: true,
      ended: true,
    });
  };

  findUser = () => {
    const match = [];
    const { annonce } = this.props;
    const { users } = this.state;

    if (annonce[0].postulants.length > 0) {
      for (let i = 0; i < annonce[0].postulants.length; i++) {
        let value = users.filter(user =>
          user.uid.includes(annonce[0].postulants[i].id)
        );

        match.push(value);
      }
    }
    this.setState({ match });
  };

  render() {
    const { match, message, engaged, ended } = this.state;
    return (
      <div>
        <div>
          {" "}
          <h1>Postulants</h1>{" "}
        </div>
        <div>
          {match.length > 0
            ? match[0].map(user => (
              <>
                <p>
                  {" "}
                  <Link style={{ color: 'black' }} to={`/publicprofile/${user.uid}`}> {user.name} </Link>
                  {!engaged && !ended ? <Button onClick={() => { this.updateToInProgress(user.name) }}>Engager</Button> : null}
                </p> <p>{message ? message : null}</p>
                {engaged && !ended && <Button variant="contained" onClick={() => { this.updateOver(user.uid) }}>Valider la mission</Button>}
              </>
            ))
            : "Pas encore de postulant"}{" "}
        </div>
      </div>
    );
  }
}

export default ApplyList;
