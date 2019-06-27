import React from "react";
import withFirebaseContext from "../Firebase/withFirebaseContext";
import TwitterTimeline from "./TwitterTimeline";
import { flexbox } from "@material-ui/system";
import Grid from '@material-ui/core/Grid'
import * as firebase from 'firebase';


class AgentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      userInfo: '',
      error: null,
    };
  }

  getUsersFromDB = () => {

    const users = []
    firebase
      .firestore()
      .collection('usersinfo').where('isAgent', '==', false)

      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          users.push({ data: doc.data(), id: doc.id });
        });
        this.setState({
          users,
        })
      });

  };

  componentDidMount() {
    this.getUsersFromDB()
    console.log(this.state.users, 'hello');
  }

  render() {

    const { users } = this.state;
    console.log(users);
    return (
      <div>

        <h1>Listes des users disponibles</h1>
        <Grid container direction="row"
          spacing={3}
          style={{ marginBottom: "50px" }}>
          {users.map(user =>
            <Grid item xs={12} sm={6} md={4} lg={3} style={{ border: "solid 2px" }}><h4>{user.data.name}</h4>
              <p>{user.data.adress}</p> </Grid>
          )}
        </Grid>
      </div>
    );
  }
}

export default withFirebaseContext(AgentView);
