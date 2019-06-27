import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/CardActionArea'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import { withRouter } from 'react-router-dom'
const ListAnnonce = props => {

 const redirectToAnnounce = () => {
    const { history } = props
    history.push(`annonce/${props.annonce.id}`)
  }
  console.log(props)
  return (
    <>
      <Grid item xs={6}>
      <Card> 
        <CardActionArea onClick={() => {redirectToAnnounce()}}>  <CardMedia style={{ height: "160px", width: '180px' }}
          image="https://image.but.fr/is/image/but/ambiance-cuisine-osalite-1920x770?$cui_1920x770$"/> 
       </CardActionArea></Card>
      </Grid>{" "}
      <Grid item xs={6}>
        {" "}
        <Typography style={{marginTop : '50px'}}>{props.annonce.data.titre}</Typography>
        <Typography>{props.annonce.data.points}</Typography>
      </Grid>{" "}
    </>
  );
};

export default withRouter(ListAnnonce);
