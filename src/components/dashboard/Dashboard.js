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
      thematiques: [],
    };
  }

  componentDidMount() {
    this.findUserProfile()
    this.getAnnounceFromDB();
    this.getthematiqueFromDB();
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
  getthematiqueFromDB = () => {
    const { firestore } = this.props;

    const themRef = firestore.collection('category').doc('thematique');
    const thematiques = [];
    themRef.get().then((document) => {
      const dbCategory = document.data();
      for (const [, value] of Object.entries(dbCategory)) {
        thematiques.push(`${value}`);
      }
      this.setState({
        thematiques,
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

  handleChoice = (thematique) => {
    this.setState({
      choice: thematique,
    });
  }


  render() {
    const {
      annonces,
      thematiques,
      choice,
      userInfo,
      showAll, user
    } = this.state;

    return (
      <div style={{ marginBottom: '60px' }}>
        {choice ?
          <ArrowBack
            style={{ position: 'fixed', left: '10px', top: '10px' }}
            onClick={() => {
              const { history } = this.props
              this.setState({
                showAll: false,
                choice: undefined
              })
              history.push('/dashboard');
            }} /> : null}

        {user && user.isAgent === false ? <> <Avatar userInfo={userInfo} />
          <Coins position="flex-end" userInfo={userInfo} /> </> : null}
        {!choice && (
          <>
            <div style={{ width: '65px', height: '65px', marginLeft: 'auto', marginRight: 'auto', marginTop: '15px' }}>
              <img style={{ width: '100%', height: '100%' }} src='https://media.discordapp.net/attachments/593438579821248535/593529192453373962/logo.png?width=465&height=468' />
            </div>
            <h3 style={{ margin: '1%' }}>Help your city, help yourself</h3>
            <p style={{ fontSize: '0.9em' }}>
              {userInfo && userInfo.isAgent ? "Trouvez un profil pour aider la communauté" : "Touvez une annonce pour aider votre communauté"}
            </p>
            <Button style={{ marginBottom: '8px', border: "solid 1px #656a6b" }} onClick={() => {
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

        <Grid container justify="center">
          {!choice ? thematiques.map(thematique => <MediaCard category={thematique} onChoice={this.handleChoice} />) : null}
        </Grid>

        <Grid container justify="center">
          {choice && userInfo && !userInfo.isAgent && annonces.length > 0 && !showAll && <h1>Annonces de{' '}{choice}</h1>}
          {choice && userInfo && !userInfo.isAgent && annonces.length > 0 && showAll && <h1>Toutes les annonces</h1>}
          {choice && userInfo && userInfo.isAgent && annonces.length > 0 ? (<><h1>Profils : {choice}</h1><AgentUserView choice={choice} /></>) : (annonces.filter(annonce => !showAll ? annonce.data.thematique.includes(choice) : annonce.data.thematique.includes('')).map(annonce => <ListAnnonce annonce={annonce} />))}
          {choice === 'all' && userInfo && userInfo.isAgent ? <AgentUserView /> : null}
        </Grid>
      </div>
    );
  }
}

export default withFirebaseContext(withRouter(Dashboard));
