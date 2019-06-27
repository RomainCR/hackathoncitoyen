import React, {useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import * as firebase from 'firebase';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 590,
    //height: 300,
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

export default function UserProfile ( props ) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);  

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  /*const usersWithCompetences = users.filter(user => user.data.hasCompetences)
  console.log(users[3] && users[3].data && users[3].data.hasCompetences, 'users');
  console.log(usersWithCompetences);

  const user3 = users[3]
  console.log(users[3] && users[3].data && users[3].data.hasCompetences, 'users');*/

  const {user} = props
  return (
    <div>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {user && user.data.name[0]}
            </Avatar>
          }
          action={
            <IconButton aria-label="Settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={user && user.data.name}
          subheader={user && user.data.adress}
        />

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {user && user.data.competences.map(comp => <p key={user.data.uid}>{comp}</p>)}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Bio :</Typography>
            <Typography paragraph>
            {user && user.data.bio}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
