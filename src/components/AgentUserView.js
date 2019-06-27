import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import Grid from '@material-ui/core/Grid'
import UserProfile from './UserProfile'
import * as firebase from 'firebase';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function AgentUserView() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [users, setUsers] = React.useState([]);


  function handleExpandClick() {
    setExpanded(!expanded);
  }

  const getUsersFromDB = () => {

    const users = []
    firebase
      .firestore()
      .collection('usersinfo')
      .where('isAgent', '==', false)
      //.where('hasCompetences', '==', true)

      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          users.push({ data: doc.data(), id: doc.id });
        });
        setUsers(users)
      });
  };

  useEffect(() => {
    getUsersFromDB()
  }, []);

  const usersWithCompetences = users.filter(user => user.data.hasCompetences)
  console.log(users[3] && users[3].data && users[3].data.hasCompetences, 'users');
  console.log(usersWithCompetences);

  const user3 = users[3]
  console.log(users[3] && users[3].data && users[3].data.hasCompetences, 'users');

  return (
    <div>
      <Grid container direction="row"
        spacing={3}
        style={{ marginBottom: "50px" }}>
        {usersWithCompetences
          .map(user => <Grid item xs={12} sm={6} md={4} lg={3} ><UserProfile user={user} /></Grid>)}
      </Grid>
    </div>
  );
}
