import React from 'react';
import { withRouter } from 'react-router';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import withFirebaseContext from '../../Firebase/withFirebaseContext';
import SelectField from './SelectFields';
import ImageAnonceUserUpload from './ImageAnnonceUserUpload';

class CreateAnnonceUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      errorMessage: '',
      titre: '',
      description: '',
      thematique: '',
      thematiquelist: [],
    };
  }

  componentDidMount() {
    this.getthematiqueFromDB();
  }

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleThematiqueChange = () => (event) => {
    this.setState({ thematique: event.target.value });
  }

  sendAnnounce = () => {
    const { firestore, history } = this.props;
    const {
      url,
      titre,
      description,
      thematique,
    } = this.state;
    const annonceRef = firestore.collection('annoncesUser').doc();
    annonceRef.set({
      url,
      titre,
      description,
      thematique,
      createur: localStorage.getItem('userId'),
      postulants: [],
    });
    history.push('/dashboard');
  };

  allStateAreFill = () => {
    const { titre, description, thematique } = this.state;
    if (titre && description && thematique) {
      return true;
    }
    this.setState({
      errorMessage: 'Tous les champs sont requis',
    });
    return false;
  };

  getImage = (url) => {
    this.setState({ url });
  }

  getthematiqueFromDB = () => {
    const { firestore } = this.props;

    const themRef = firestore.collection('category').doc('thematique');
    const thematique = [];
    themRef.get().then((document) => {
      const dbCategory = document.data();
      for (const [, value] of Object.entries(dbCategory)) {
        thematique.push(`${value}`);
        console.log(value);
      }
      this.setState({
        thematiquelist: thematique,
      });
    });
  };

  validateAnnounce() {
    if (this.allStateAreFill()) {
      this.sendAnnounce();
    }
  }

  render() {
    const {
      description,
      errorMessage,
      thematiquelist,
      thematique,
      titre,
    } = this.state;
    return (
      <div>
        <h1>Faire une suggestion à votre ville</h1>
        <ImageAnonceUserUpload getImage={this.getImage} />
        <div>
          <TextField
            required
            id="outlined-required"
            label="Titre"
            defaultValue="Titre"
            margin="normal"
            variant="outlined"
            value={titre}
            rows="1"
            onChange={this.handleChange('titre')}
          />
        </div>
        <div>
          <TextField
            required
            id="outlined-multiline-static"
            label="Description"
            value={description}
            multiline
            rows="5"
            defaultValue="Description"
            margin="normal"
            variant="outlined"
            onChange={this.handleChange('description')}
          />
        </div>
        <div>
          <p>{errorMessage}</p>
        </div>
        <div>
          <SelectField
            name="Thematique"
            choices={thematiquelist}
            handleChange={this.handleThematiqueChange}
            value={thematique}
          />
        </div>
        <Button
          size="large"
          type="button"
          variant="contained"
          style={{
            marginBottom: '70px',
            width: '300px',
          }}
          className="Button"
          onClick={() => {
            this.sendAnnounce();
          }}
        >
          Proposer
        </Button>
      </div>
    );
  }
}

export default withRouter(withFirebaseContext(CreateAnnonceUser));
