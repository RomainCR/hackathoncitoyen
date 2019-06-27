import React from 'react';
import * as firebase from 'firebase';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Avatar from '../Avatar';
import MediaCard from './MediaCard';
import TwitterTimeline from '../TwitterTimeline';
import withFirebaseContext from '../../Firebase/withFirebaseContext';
import Coins from '../Coins';
import ListAnnonce from './ListAnnonce';
import AgentUserView from '../AgentUserView';
import { withRouter } from 'react-router-dom'
import ArrowBack from '@material-ui/icons/ArrowBack'

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      annonces: [],
      error: null,
      thématiques: [],
    };
  }

  componentDidMount() {
    this.findUserProfile()
    this.getAnnounceFromDB();
    this.getThématiqueFromDB();
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
  findUserProfile = () => {
    const user = [];
    firebase
      .firestore()
      .collection("usersinfo")
      .doc(`${localStorage.getItem("userId")}`)

      .get()
      .then(doc => {
        user.push(doc.data());
      });

    this.setState({
      user
    });
  };
  getThématiqueFromDB = () => {
    const { firestore } = this.props;

    const themRef = firestore.collection('category').doc('thématique');
    const thématiques = [];
    themRef.get().then((document) => {
      const dbCategory = document.data();
      for (const [, value] of Object.entries(dbCategory)) {
        thématiques.push(`${value}`);
      }
      this.setState({
        thématiques,
      });
    });
  };

  getAnnounceFromDB = () => {
    const annonces = [];
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
        });
      });
    this.setState({
      annonces,
    });
  };

  getInfo = (docRef) => {
    docRef.get().then((doc) => {
      if (doc.exists) {
        const userInfo = doc.data();
        this.setState({
          userInfo,
        });
      }
    });
  }

  handleChoice = (thématique) => {
    this.setState({
      choice: thématique,
    });
  }


  render() {
    const {
      annonces,
      thématiques,
      choice,
      userInfo,
      showAll, user
    } = this.state;

    return (
      <div style={{ marginBottom: '80px' }}>
       {  choice ? 
       <ArrowBack
          style={{ position: 'fixed', left: '10px', top: '10px' }}
          onClick={() => {
            const { history } = this.props
            this.setState({
              showAll:false,
              choice: undefined
            })
            history.push('/dashboard');
          }}/> : null}
         
       { user && user.isAgent === false ? <> <Avatar userInfo={userInfo} />
        <Coins position="flex-end" userInfo={userInfo} /> </> : null  }
        {!choice && (
        <> <p>UniCity </p>
          <Button onClick={() => {
            this.setState({
              showAll: true,
              choice: 'all'
            })
          }}>
            {userInfo && userInfo.isAgent ? 'Afficher tous les profils' : 'Afficher toutes les annonces'}
          </Button>
        </>
        )
        }

        <Grid container>
          {!choice ? thématiques.map(thématique => <MediaCard category={thématique} onChoice={this.handleChoice} />) : null}
          {choice && userInfo && userInfo.isAgent ? (<AgentUserView choice={choice} />) : (annonces.filter(annonce => !showAll ? annonce.data.thématique.includes(choice) : annonce.data.thématique.includes('')).map(annonce => <ListAnnonce annonce={annonce} />))}
        </Grid>

        <Grid container>
          {choice ? annonces.filter(annonce => !showAll ? annonce.data.thématique.includes(choice) : annonce.data.thématique.includes('')).map(annonce => <ListAnnonce annonce={annonce} />) : null}
        </Grid>
      </div>
    );
  }
}

export default withFirebaseContext(withRouter(Dashboard));
