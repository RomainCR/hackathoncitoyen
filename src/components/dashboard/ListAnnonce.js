import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/CardActionArea'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: 10,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

const ListAnnonce = (props) => {
  const classes = useStyles();

  const redirectToAnnounce = () => {
    const { history } = props;
    history.push(`annonce/${props.annonce.id}`);
  };

  const putImage = (annonce) => {
    console.log(annonce)
    if (annonce.data.thématique === 'Nature et jardinage') {
      return 'https://i.ibb.co/gRxQRNC/nature.png';
    }
    if (annonce.data.thématique === 'Ecologie et nettoyage') {
      return 'https://i.ibb.co/q1KScvP/ecologie.png';
    }
    if (annonce.data.thématique === 'Loisir et divertissement') {
      return 'https://i.ibb.co/p2gd20D/loisir.png';
    }
    if (annonce.data.thématique === 'Aide à la personne') {
      return 'https://i.ibb.co/55sdLQw/aide.png';
    }
    if (annonce.data.thématique === 'Réparation et bricolage') {
      return 'https://i.ibb.co/9YqWPBC/brico.png';
    }
    if (annonce.data.thématique === 'Education') {
      return 'https://i.ibb.co/NWmx5KC/ducation.png';
    }
  };

  return (
    <Container className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2} justify="center" alignItems="center" onClick={redirectToAnnounce}>
          <Grid item>
            <ButtonBase className={classes.image}>
              {props.annonce.data.url ? <img className={classes.img} alt="complex" src={props.annonce.data.url} />
              : <img className={classes.img} alt="complex" src="https://via.placeholder.com/150" />}
              
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {props.annonce.data.titre}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {props.annonce.data.description}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{props.annonce.data.points}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default withRouter(ListAnnonce);
