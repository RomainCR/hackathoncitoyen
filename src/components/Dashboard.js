import React from "react";
import withFirebaseContext from "../Firebase/withFirebaseContext";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { annonces: [] };
  }
  componentDidMount() {}

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

  render() {
    const { annonces } = this.state;
    return (
      <div>
        <p>Hello</p>
        {annonces.map(annonces => (
          <div>{annonces.nom} </div>
        ))}
      </div>
    );
  }
}

export default withFirebaseContext(Dashboard);
