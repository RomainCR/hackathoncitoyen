import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import withFirebaseContext from '../Firebase/withFirebaseContext';

const useStyles = makeStyles({
  avatar: {
    margin: 10,

    right: '0',
    top: '10',

  },

});

function ImgAvatar(props) {
  const classes = useStyles();
  const [userInfo, setInfo] = useState({});
  const { history, firestore } = props;

  const getInfo = (docRef) => {
    docRef.get().then((doc) => {
      if (doc.exists) {
        const info = doc.data();
        setInfo(info);
      }
    });
  };

  useEffect(() => {
    let docRef;
    if (localStorage.getItem('userId')) {
      docRef = firestore.doc(`usersinfo/${localStorage.getItem('userId')}`);
      getInfo(docRef);
      console.log('hello')
    } else {
      const { auth } = this.props;
      auth.onAuthStateChanged((user) => {
        if (user) {
          docRef = firestore.doc(`usersinfo/${user.uid}`);
          getInfo(docRef);
        }
      });
    }
  }, [userInfo.length, firestore]);



  return (
    <Grid container justify="flex-end">
      {userInfo && <Avatar alt="Remy Sharp" src={userInfo.url} onClick={() => { history.push('/Profile'); }} className={classes.avatar} />
      }
    </Grid>
  );
}

export default withFirebaseContext(withRouter(ImgAvatar));
