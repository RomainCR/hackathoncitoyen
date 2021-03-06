import React, { Component } from "react";
import ItemList from "./ItemList";
import WithFirebaseContext from "../../Firebase/withFirebaseContext";
import Grid from "@material-ui/core/Grid";
import Coins from '../Coins';
import Avatar from '../Avatar'

class SpendCredit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
    };
  }

  componentDidMount() {
    this.getItemsFromDB();
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
    });
  }

  getItemsFromDB = () => {
    const { firestore } = this.props;
    const items = [];
    firestore
      .collection("FreeItem")
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          items.push(doc.data());
        });
        this.setState({
          items
        });
      });
  };

  
  
  render() {
    const { items, userInfo } = this.state;
    return (
      <div style={{marginBottom: '50px'}}>

        <p style={{fontWeight: 'bold'}}>Activités accessibles avec vos crédits</p>
        <p style={{fontSize: '0.8em'}}>Rendez-vous directement dans les infrastructures pour les utiliser</p>
        <Avatar style={{ marginTop: '20%'}} />
        <Coins position="center" userInfo={userInfo} />
        <Grid container >
          {items ? items.map(item => <ItemList key={Math.floor(Math.random()*5000)} item={item} user={userInfo} />) : null}
          {" "}
        </Grid>
      </div>
    );
  }
}

export default WithFirebaseContext(SpendCredit);
