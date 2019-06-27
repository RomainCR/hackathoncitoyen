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
        <Avatar style={{ marginTop: '15%', marginTop: '20%' }} />
        <p>Dépenser vos crédits</p>
        <h1> 50
        <img className="money" style={{ width: '5%', height: '5%', marginRight: '5%', marginTop: '4%', marginLeft: '1%'}} src='https://i.ibb.co/SnyPLSx/money.png' alt="money" /></h1>
        <Grid container>
          {items ? items.map(item => <ItemList item={item} />) : null}{" "}
        </Grid>
      </div>
    );
  }
}

export default WithFirebaseContext(SpendCredit);
