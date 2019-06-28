import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as firebase from 'firebase';
import ArrowBack from '@material-ui/icons/ArrowBack';
import {
  TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton,
} from 'react-twitter-embed';
import withFirebaseContext from '../../Firebase/withFirebaseContext';
import Avatar from '../Avatar';
import Coins from '../Coins';
import UntouchableCard from './UntouchableCard';
import ApplyList from '../apply/applyList';


class SeeAnnounce extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      buttonPostuler: 'inline',
      user: {},
    };
  }

  componentDidMount() {
    this.findUserProfile();
    this.getAnnounceFromDB();
  }

  getAnnounceFromDB = () => {
    const { match } = this.props;
    const id = match.params.annonceid;
    const annonce = [];
    const { firestore } = this.props;
    firestore
      .collection('annonces')
      .doc(id)
      .get()
      .then((document) => {
        const doc = document.data();

        annonce.push(doc);

        this.setState({
          annonce,
          id,
        });
      });
  };

  findUserProfile = () => {
    const user = [];
    firebase
      .firestore()
      .collection('usersinfo')
      .doc(`${localStorage.getItem('userId')}`)

      .get()
      .then((doc) => {
        user.push(doc.data());
      });

    this.setState({
      user,
    });
  };

  updateToInProgress = () => {
    const { firestore } = this.props;
    const { id } = this.state;
    const annonceRef = firestore.collection('annonces').doc(id);
    annonceRef.update({
      inProgress: true,
    });
  };

  sendMyApplication = () => {
    const { annonce, apply, user } = this.state;

    if (
      annonce[0].postulants
        .map(item => item.id === localStorage.getItem('userId'))
        .includes(false)
      || (annonce[0].postulants.map(
        item => item.id === localStorage.getItem('userId'),
      ).length === 0
        && !apply)
    ) {
      const { match } = this.props;
      const id = match.params.annonceid;
      firebase
        .firestore()
        .collection('annonces')
        .doc(id)
        .update({
          postulants: firebase.firestore.FieldValue.arrayUnion({
            id: localStorage.getItem('userId'),
            date: Date(Date.now()).toString(),
          }),
        });
        firebase
        .firestore()
        .collection('usersinfo')
        .doc(user.uid)
        .update({
          candidatures: firebase.firestore.FieldValue.arrayUnion(id),
        });
      this.setState({
        buttonPostuler: 'none',
        message: 'Votre candidature a bien été prise en compte.',
        apply: true,
      });
    } else {
      const date = annonce[0].postulants.filter(annonce => annonce.id.includes(localStorage.getItem('userId')));

      this.setState({
        message: `Vous avez déjà postulé à cette annonce le ${
          date[0].date
        } , votre candidature sera traitée dans les plus brefs délais.`,
      });
    }
  };

  render() {
    const {
      annonce, message, id, user, buttonPostuler,
    } = this.state;

    return (
      <div>
        {' '}
        <ArrowBack
          style={{ position: 'fixed', left: '10px', top: '10px' }}
          onClick={() => {
            const { history } = this.props;
            this.setState({
              showAll: false,
              choice: undefined,
            });
            history.push('/dashboard');
          }}
        />
        {annonce ? (
          <>
            {' '}
            <h1 style={{ marginTop: '20px' }}>{annonce[0].titre}</h1>
            {' '}
            <UntouchableCard annonce={annonce[0]} />
            <p style={{ marginTop: '20px' }}>
              {annonce[0].points}
              {' '}
              <img
                className="money"
                style={{
                  width: '5%',
                  height: '5%',
                  marginRight: '5%',
                  marginTop: '4%',
                  marginLeft: '1%',
                }}
                src="https://i.ibb.co/SnyPLSx/money.png"
                alt="money"
              />
              {' '}
            </p>
            {' '}
            <div style={{ marginTop: '50px' }}>
              {' '}
              <div
                style={{
                  padding: '9px', marginTop: '50px', width: '100%', backgroundColor: '#dad8d8', color: 'black',
                }}
              >
                {annonce[0].description}
              </div>
              {' '}
            </div>
          </>
        ) : (
          <p> loading..</p>
        )}
        {' '}
        {annonce ? (
          user[0].isAgent === false ? (
            <>
              {' '}
              <h4>Vous souhaitez vous investir dans la vie de votre ville ?</h4>
              <Button
                onClick={() => {
                  this.sendMyApplication();
                }}
                style={{
                  marginTop: '50px',
                  display: buttonPostuler,
                }}
                variant="contained"
              >
                Postuler
              </Button>
              <p style={{ marginTop: '80px' }}>{message}</p>
            </>
          )
            : (
              <ApplyList id={id} annonce={annonce} />
            )
        ) : null}
        <div style={{
          paddingTop: '30px',
          marginBottom: '80px',
        }}
        >
          <TwitterHashtagButton
            tag="uniCity"
          />
        </div>
      </div>
    );
  }
}

export default withFirebaseContext(withRouter(SeeAnnounce));
