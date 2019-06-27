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
        engaged : true,
        message : 'Mission en cours de réalisation'
      })
    }

   } );
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
      message : `${name} a été engagé !`,
      engaged : true
    })


  
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
    const { match, message, engaged } = this.state;
    console.log(match);
    return (
      <div>
        <div>
          {" "}
          <h1>Postulants</h1>{" "}
        </div>
        <p>
          {match.length > 0
            ? match[0].map(user => (
              <>
                <p>
                  {" "}
                  <Link to={`/publicprofile/${user.uid}`}> {user.name} </Link>
                 {!engaged  ?  <Button onClick={() => {this.updateToInProgress(user.name)}}>Engager</Button> : null}
                   </p> <p>{message ? message : null}</p>
               </>
              ))
            : null}{" "}
        </p>
      </div>
    );
  }
}

export default ApplyList;
