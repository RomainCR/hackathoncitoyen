import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import AccountBox from '@material-ui/icons/AccountBox';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as firebase from 'firebase';
import { flexbox, border } from '@material-ui/system';

const picto = {
  'Nature et jardinage': 'https://i.ibb.co/gRxQRNC/nature.png',
  'Ecologie et nettoyage': 'https://i.ibb.co/q1KScvP/ecologie.png',
  'Loisir et divertissement': 'https://i.ibb.co/p2gd20D/loisir.png',
  'Aide à la personne': 'https://i.ibb.co/9YqWPBC/brico.png',
  'Réparation et bricolage': 'https://i.ibb.co/9YqWPBC/brico.png',
  Education: 'https://i.ibb.co/NWmx5KC/ducation.png',
};


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 590,
    // height: 300,
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
  title: {
    scale: 'transform(1.2)',
  },
}));

export default function UserProfile(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  const { user } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardHeader
          avatar={(
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {user && user.data.name[0]}
            </Avatar>
          )}
          action={(
            <CardActions disableSpacing>
              <IconButton aria-label="Add to favorites">
                <Link to={`/publicprofile/${user.id}`}><AccountBox /></Link>
              </IconButton>
            </CardActions>
          )}
          title={user && user.data.name}
          subheader={user && user.data.adress}
        />
        <CardContent>
          <div style={{
            display: 'flex',
          }}
          >
            <Typography variant="body2" color="textSecondary">
              {user && user.data.competences.map(comp => (
                <img
                  alt={comp}
                  src={picto[comp]}
                  key={Math.floor(Math.random() * 5000)}
                  style={{
                    backgroundColor: '#347B98',
                    width: '15%',
                    borderRadius: '200px',
                    margin: '4%',
                  }}
                />
              ))}
            </Typography>
          </div>
        </CardContent>
        {/* <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>

         <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Bio :</Typography>
            <Typography paragraph>
              {user && user.data.bio}
            </Typography>
          </CardContent>
          </Collapse> */}
      </Card>
    </div>
  );
}
