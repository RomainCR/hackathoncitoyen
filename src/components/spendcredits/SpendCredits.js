import React, { Component } from "react";
import ItemList from "./ItemList";
import WithFirebaseContext from "../../Firebase/withFirebaseContext";
import Grid from "@material-ui/core/Grid";
import Avatar from '../Avatar'

class SpendCredit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getItemsFromDB();
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
    const { items } = this.state;
    return (
      <div>
        <Avatar></Avatar>
        <h1>Utiliser vos crédits</h1>
        <h1>Votre credit est de</h1>
        <Grid container>
          {items ? items.map(item => <ItemList item={item} />) : null}{" "}
        </Grid>
      </div>
    );
  }
}

export default WithFirebaseContext(SpendCredit);
