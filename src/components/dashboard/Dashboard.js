import React from "react";
import withFirebaseContext from "../../Firebase/withFirebaseContext";
import TwitterTimeline from "../TwitterTimeline";
import Avatar from '../Avatar'
import * as firebase from 'firebase';
import Button from '@material-ui/core/Button'
import MediaCard from './MediaCard'
import Grid from '@material-ui/core/Grid'
import Coins from '../Coins'
import ListAnnonce from './ListAnnonce'
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      annonces : [],
  
      error: null,
  
      thématiques : []
    };
  }
 

  getAnnounceFromDB = () => {
  
    const annonces = []
    firebase
    .firestore()
    .collection('annonces')
   
    .get()
    .then((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        annonces.push({ data: doc.data(), id: doc.id });
      });
       this.setState({
         annonces,
       })
    });
   
  };
  getThématiqueFromDB = () => {
    const { firestore } = this.props;

    const themRef = firestore.collection("category").doc("thématique");
    const thématiques = [];
    themRef.get().then(document => {
      const dbCategory = document.data();

      for (const [, value] of Object.entries(dbCategory)) {
        thématiques.push(`${value}`);
      
      }
      this.setState({
        thématiques,
      })

    
    });
  };

  componentDidMount() {
    this.getAnnounceFromDB()
    this.getThématiqueFromDB()
    const { firestore } = this.props;
    let docRef;
    if (localStorage.getItem('userId')) {
      docRef = firestore.doc(`usersinfo/${localStorage.getItem('userId')}`);
      this.getInfo(docRef);
    } else {
      const { auth } = this.props;
      auth.onAuthStateChanged((user) => {
        if (user) {
          docRef = firestore.doc(`usersinfo/${user.uid}`);
          this.getInfo(docRef);
        }
      });
    }
  }

  getInfo = (docRef) => {
    docRef.get().then((doc) => {
      if (doc.exists) {
        const userInfo = doc.data();
        this.setState({
          userInfo,
        });
      }
    }).catch((error) => {
      this.setState({ error });
    });
  }
handleChoice = (thématique) => {

  this.setState({
    choice : thématique
  })
}


  render() {
    const { annonces,  thématiques , choice, showAll} = this.state;
 
    return (
      <div>
        <button onClick={() => {
          this.setState({
            choice : undefined,
            showAll : false,
          })
        }}>reset thématique</button>
      <Avatar/>
      <Coins/>
       {!choice ?  <> <p>Nom de l'application </p>
        <Button onClick={() => {this.setState({
          showAll : true,
          choice : 'all'
        })}}>Afficher toutes les annonces</Button> </> : null} 
     
        
        <Grid container > 
      {!choice ?    thématiques.map(thématique =>  <MediaCard category={thématique} onChoice={this.handleChoice}/>  ) : null}
       
     
        
        {choice ? annonces.filter( annonce => !showAll ? annonce.data.thématique.includes(choice) : annonce.data.thématique.includes('')).map(annonce => <ListAnnonce annonce={annonce}/>) :  null}
       </Grid>
    
        <div style={{ 
          display: "flex",
          justifyContent: "center", }}>
         
        </div>
      </div>
    );
  }
}

export default withFirebaseContext(Dashboard);
