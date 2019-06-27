import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import Edit from '@material-ui/icons/Edit';
import AccountBox from '@material-ui/icons/AccountBox';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookIcon from '@material-ui/icons/Book';
import { withRouter } from 'react-router';
import withFirebaseContext from '../Firebase/withFirebaseContext';

const useStyles = makeStyles({
  root: {
    marginTop:'20px',
    width: '100%',
    position: 'fixed',
    bottom: '0'
  },
});

function BottomNav(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');
  const [userInfo, setInfo] = useState({ });
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

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction onClick={() => {history.push('/dashboard')}} value="recents" icon={<HomeIcon />} />
      <BottomNavigationAction onClick={() => {history.push('/SpendCredits')}} value="favorites" icon={<BookIcon />} />
      <BottomNavigationAction onClick={userInfo && userInfo.isAgent ? () => {history.push('/agentprofile')} : () => {history.push('/myProfile')} } label="Profile" icon={<AccountBox />} />
      <BottomNavigationAction onClick={userInfo && userInfo.isAgent ? () => {history.push('/createannonce')} : () => {history.push('/createAnnonceUser')} } label="Profile" icon={<Edit />} />
    </BottomNavigation>
  );
}
export default withFirebaseContext(withRouter(BottomNav));
