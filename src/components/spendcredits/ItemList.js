import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid'
import { withRouter} from 'react-router-dom'
const useStyles = makeStyles({
  card: {
    maxWidth: '15%',
    display: "inline",
    

  },
  media: {
    height: 140,
    backgroundColor: '#347B98',
  },
});


 function MediaCard(props) {
  const classes = useStyles();
const redirect = ()=> {
const { history } = props
history.push({pathname : '/qrcode', state: { value: props.item, id : props.user.uid }})

}

const { user } = props
console.log(props.user.credits, parseInt(props.item.prix.split('c')))
  return (
 
   
    <Grid item xs={6} style={{ border: '1px solid black'}}>
   { user.credits > parseInt(props.item.prix.split('c')) ? <>
    <Card className={classes.card}>

      <CardActionArea  onClick={() => {redirect()}}style={{ backgroundColor: '#347B98' }} >
        <CardMedia
          className={classes.media}
          image= { props.item.image}
         
        />
        <p style={{ fontSize: '12px'}}>{props.item.nom}</p>
        <p style={{ fontSize: '15px'}}>{props.item.prix}</p>  <p style={{ fontSize: '19px'}}>Cliquez ici pour obtenir le QR Code</p> 
      </CardActionArea>
    
    </Card> </>: <> <Card className={classes.card}>

<CardActionArea  style={{ backgroundColor: '#347B98' }} >
  <CardMedia
    className={classes.media}
    image= { props.item.image}
   
  />
  <p style={{ fontSize: '12px'}}>{props.item.nom}</p>
  <p style={{ fontSize: '15px'}}>{props.item.prix}</p>
  <p style={{ fontSize: '19px'}}> vous n'avez pas assez de crédits </p> 
</CardActionArea>
</Card> </> }
    </Grid>
  );
}export default withRouter(MediaCard);