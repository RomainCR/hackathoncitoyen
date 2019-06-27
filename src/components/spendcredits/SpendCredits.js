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
      <div>
<<<<<<< HEAD
        <Avatar style={{ marginTop: '15%', marginTop: '20%' }} />
        <p>Un gros merci pour votre aide, ainsi que votre dévouement... les habitants de notre ville ont de plus en plus besoin de votre positivisme ainsi que de votre implication, ainsi ils peuvent constater qu’avec du bon vouloir, google et de la volonté, ils  peuvent eux aussi contribuer à un avenir meilleur... Bravo!</p> <p>Greug Petit, Maire d'une ville paumée</p>
=======
        <Avatar style={{ marginTop: '20%'}} />
        <p style={{ marginTop: '15%'}} >Dépenser vos crédits</p>
>>>>>>> 164bee6526b260c14ecad4058764b02fcbfae050
        <Coins position="center" userInfo={userInfo} />
        <Grid container>
          {items ? items.map(item => <ItemList key={Math.floor(Math.random()*5000)} item={item} />) : null}{" "}
        </Grid>
      </div>
    );
  }
}

export default WithFirebaseContext(SpendCredit);
