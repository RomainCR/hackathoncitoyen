import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookIcon from '@material-ui/icons/Book';
import { withRouter } from 'react-router';
const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: '0'
  },
});

function BottomNav(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  const { history } = props
  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction onClick={() => {history.push('/dashboard')}} value="recents" icon={<HomeIcon />} />
      <BottomNavigationAction onClick={() => {history.push('/SpendCredits')}} value="favorites" icon={<BookIcon />} />
     
    </BottomNavigation>
  );
}
export default withRouter(BottomNav)