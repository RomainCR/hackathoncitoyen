import React from "react";
import withFirebaseContext from "../Firebase/withFirebaseContext";
import TwitterTimeline from "./TwitterTimeline";
import { flexbox } from "@material-ui/system";

class AgentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      userInfo: '',
      error: null,
    };
  }
  componentDidMount() { }

  /*getUsersFromDB = () => {
    const { firestore } = this.props;
    firestore
      .collection("usersinfo")
      .doc()
      .get()
      .then(document => {
        const users = document.data();

        for (const [, value] of Object.entries(users)) {
          users.push(value);
        }
      });
  };*/
  getUsersFromDB = () => {
    const { users } = this.state
    const { firebase } = this.props;
    firebase
      .firestore()
      .collection('usersinfo').where('isAgent', '==', false)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          users.push({ data: doc.data(), id: doc.id });
        });
        console.log(users);
      });
  }


  /* componentDidMount() {
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
   }*/

  render() {

    const { users } = this.state;
    console.log(users);
    return (
      <div>
        <h1>Hello {users.name} </h1>
        <div style={{
          display: "flex",
          justifyContent: "center",
        }}>
          <TwitterTimeline />
        </div>
      </div>
    );
  }
}

export default withFirebaseContext(AgentView);
