import React, { Component } from "react";
import withFirebaseContext from "../../Firebase/withFirebaseContext";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Avatar from "../Avatar";
import Coins from "../Coins";
import TextField from "@material-ui/core/TextField";
import UntouchableCard from './UntouchableCard'
class SeeAnnounce extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
          annonce
        });
      });
  };

  render() {
    const { annonce } = this.state;
    return (
      <div>
        {" "}
        <Avatar /> <Coins position="flex-end"/>
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
          </>
        ) : (
          <p> loading..</p>
        )}{" "}
        <Button style={{marginTop: '50px'}}>Postuler</Button>
      </div>
    );
  }
}

export default withFirebaseContext(withRouter(SeeAnnounce));
