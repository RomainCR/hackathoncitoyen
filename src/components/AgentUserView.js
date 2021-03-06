import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import * as firebase from 'firebase';
import UserProfile from './UserProfile';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function AgentUserView({ choice }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [users, setUsers] = React.useState([]);


  function handleExpandClick() {
    setExpanded(!expanded);
  }

  const getUsersFromDB = () => {
    const users = [];
    firebase
      .firestore()
      .collection('usersinfo')
      .where('isAgent', '==', false)

      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          users.push({ data: doc.data(), id: doc.id });
        });
        setUsers(users);
      });
  };

  useEffect(() => {
    getUsersFromDB();
  }, []);

  const usersWithCompetences = users.filter(user => user.data.hasCompetences);

  const user3 = users[3];

  return (
    <div>
      <Grid
        container
        direction="row"
        spacing={3}
        style={{ marginBottom: '50px' }}
      >
        {usersWithCompetences
          .filter(UWC => (choice ? UWC.data.competences
            .includes(choice) : UWC.data.competences))
          .map(user => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={Math.floor(Math.random() * 5000)}>
              <UserProfile user={user} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}
