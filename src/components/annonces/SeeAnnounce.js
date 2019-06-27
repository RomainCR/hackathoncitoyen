import React, { Component } from "react";
import withFirebaseContext from "../../Firebase/withFirebaseContext";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Avatar from "../Avatar";
import Coins from "../Coins";
import TextField from "@material-ui/core/TextField";
import UntouchableCard from './UntouchableCard'
import * as firebase from 'firebase'
import ApplyList from '../apply/applyList'

class SeeAnnounce extends Component {
  constructor(props) {
    super(props);
    this.state = {message : ''};
  }

  componentDidMount() {
    this.getAnnounceFromDB();
  }

  getAnnounceFromDB = () => {
    const { match } = this.props;
    const id = match.params.annonceid;
    let annonce = [];
    const { firestore } = this.props;
    firestore
      .collection("annonces")
      .doc(id)
      .get()
      .then(document => {
        const doc = document.data();

        annonce.push(doc);

        this.setState({
          annonce,
          id,
        });
      });
  };

  sendMyApplication = () => {
    const { annonce, apply } = this.state
    console.log(annonce)
    console.log(annonce[0].postulants.map(item => item.id === localStorage.getItem('userId')))
    if (annonce[0].postulants.map(item => item.id === localStorage.getItem('userId')).includes(false)    
   || annonce[0].postulants.map(item => item.id === localStorage.getItem('userId')).length === 0   && !apply ){
    const { match } = this.props
    const id = match.params.annonceid;
    firebase.firestore().collection('annonces').doc(id).update({
      postulants : firebase.firestore.FieldValue.arrayUnion({ id : localStorage.getItem('userId') , date : Date(Date.now()).toString()})
    })
    this.setState({
      message : 'Votre candidature a bien été prise en compte.',
      apply : true,
    })}
    else {
     const date =  annonce[0].postulants.filter(annonce => annonce.id.includes(localStorage.getItem('userId')))
     
      this.setState({
      message : `Vous avez déjà postulé à cette annonce le ${date[0].date} , votre candidature sera traitée dans les plus brefs délais.`
    })}
  }

  render() {
    const { annonce, message, id } = this.state;

    return (
      <div>
        {" "}
        <Avatar /> <Coins />
        {annonce ? (
          <>
            {" "}
            <p  style={{marginTop : '20px'}}>{annonce[0].titre}</p> <UntouchableCard/><p style={{marginTop : '20px'}}>{annonce[0].points}</p> {" "}
            <div style={{marginTop : '50px'}}>
              {" "}
              <TextField
                disabled
                multiline
                rows="5"
                style={{width: '100%', backgroundColor : 'grey'}}
                value={annonce[0].description}
              />
            </div>{" "}
            <p>{message}</p>
          
          </>
        ) : (
          <p> loading..</p>
        )}{" "}
        <Button onClick={() => {this.sendMyApplication()}} style={{marginTop: '50px'}}>Postuler</Button>  <ApplyList id={id} annonce={annonce} />
      </div>
    );
  }
}

export default withFirebaseContext(withRouter(SeeAnnounce));
