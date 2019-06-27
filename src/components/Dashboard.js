import React from "react";
import withFirebaseContext from "../Firebase/withFirebaseContext";
import TwitterTimeline from "./TwitterTimeline";
import AgentView from "./AgentView";
import { flexbox } from "@material-ui/system";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      annonces: [],
      userInfo: '',
      error: null,
    };
  }
  componentDidMount() { }

  getAnnounceFromDB = () => {
    const { firestore } = this.props;
    firestore
      .collection("annonces")
      .doc()
      .get()
      .then(document => {
        const annonces = document.data();

        for (const [, value] of Object.entries(annonces)) {
          annonces.push(value);
        }
      });
    //  this.setState({
    //  annonces: annonces
    // });
  };

  componentDidMount() {
    const { firestore } = this.props;
    let docRef;
    if (localStorage.getItem('userId')) {
      docRef = firestore.doc(`usersinfo/${localStorage.getItem('userId')}`);
      this.getInfo(docRef);
    } else {
      const { auth } = this.props;
      auth.onAuthStateChanged((user) => {
        if (user) {
          docRef = firestore.doc(`usersinfo/${user.uid}`);
          this.getInfo(docRef);
        }
      });
    }
  }

  getInfo = (docRef) => {
    docRef.get().then((doc) => {
      if (doc.exists) {
        const userInfo = doc.data();
        this.setState({
          userInfo,
        });
      }
    }).catch((error) => {
      this.setState({ error });
    });
  }

  render() {
    const { annonces, userInfo } = this.state;
    return (
      <div>
        <h1>Hello {userInfo.name} </h1> 
        <div>
          {annonces.map(annonces => (
            <div>{annonces.nom} </div>
          ))}

        </div>
        <div style={{ 
          display: "flex",
          justifyContent: "center", }}>
          <TwitterTimeline />
        </div>
      </div>
    );
  }
}

export default withFirebaseContext(Dashboard);
