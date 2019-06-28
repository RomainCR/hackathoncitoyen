import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ImageAnonceUpload from './ImageAnnonceUpoad';
import SelectField from './SelectFields';
import withFirebaseContext from '../../Firebase/withFirebaseContext';

class CreateAnnonce extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      titre: '',
      description: '',
      thématique: '',
      points: '',
      thématiquelist: [],
      url: '',
    };
  }

  componentDidMount() {
    this.getThématiqueFromDB();
  }

  handleChange = name => (event) => {
    if (name === 'points') {
      console.log('test');
      const value = event.target.value.replace(/[^\d]/g, '');

      this.setState({ [name]: value });
    } else {
      this.setState({
        errorMessage: 'Veuillez entrer un nombre',
      });
    }
    if (name !== 'points') {
      this.setState({ [name]: event.target.value });
    }
  };

  handleThematiqueChange = () => (event) => {
    this.setState({ thématique: event.target.value });
  }

  getImage = (url) => {
    this.setState({ url });
  }

  sendAnnounce = () => {
    const { firestore } = this.props;
    const {
      url,
      titre,
      description,
      thématique,
      points,
    } = this.state;
    const annonceRef = firestore.collection('annonces').doc();
    annonceRef.set({
      url,
      titre,
      description,
      thématique,
      createur: localStorage.getItem('userId'),
      points,
    });
  };

  sendFree = () => {
    const { firestore } = this.props;
    const annonceRef = firestore.collection('FreeItem').doc();
    annonceRef.set({
      nom: (Math.floor(Math.random() * 50000)),
      description: (Math.floor(Math.random() * 50000)),
      prix: (Math.floor(Math.random() * 50000)),
    });
  };

  allStateAreFill = () => {
    const {
      titre,
      description,
      thématique,
      points,
    } = this.state;
    if (titre && description && thématique && points) {
      return true;
    }
    this.setState({
      errorMessage: 'Tous les champs sont requis',
    });
    return false;
  };

  getThématiqueFromDB = () => {
    const { firestore } = this.props;

    const themRef = firestore.collection('category').doc('thématique');
    const thématique = [];
    themRef.get().then((document) => {
      const dbCategory = document.data();

      for (const [, value] of Object.entries(dbCategory)) {
        thématique.push(`${value}`);
        console.log(value)
      }

      this.setState({
        thématiquelist: thématique,
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
      points,
      thématiquelist,
      thématique,
      titre,
    } = this.state;
    return (
      <div>
        <h1>Créer une annonce</h1>
        <ImageAnonceUpload getImage={this.getImage} />
        <TextField
          required
          id="outlined-required"
          label="Titre"
          defaultValue="Titre"
          margin="normal"
          variant="outlined"
          value={titre}
          onChange={this.handleChange('titre')}
        />
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
          <TextField
            required
            id="outlined-required"
            label="Points"
            defaultValue="Hello World"
            margin="normal"
            variant="outlined"
            value={points}
            onChange={this.handleChange('points')}
          />
        </div>
        <div>
          <p>
            { errorMessage }
          </p>
        </div>
        <div>
          <SelectField
            name="Thématique"
            choices={thématiquelist}
            handleChange={this.handleThematiqueChange}
            value={thématique}
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
          onClick={() => { this.sendAnnounce(); }}
        >
          Publier
        </Button>
      </div>
    );
  }
}

export default withFirebaseContext(CreateAnnonce);
