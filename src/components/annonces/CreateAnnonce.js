import React from "react";
import withFirebaseContext from "../../Firebase/withFirebaseContext";
import SelectField from "./SelectFields"
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
class CreateAnnonce extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      titre : '',
      description : '',
      thématique : [],
      points : '',
      thématiquelist : []
    };
  }


  componentDidMount() {
    this.getThématiqueFromDB();
  }

  handleChange = name => event => {
    
    if (name === 'points') {
      console.log('test')
      const value = event.target.value.replace(/[^\d]/g, '');

        this.setState({ [name]: value });
      } else {
        this.setState({
          errorMessage: "Veuillez entrer un nombre"
        });
      }
     if (name !== 'points') {
      this.setState({ [name]: event.target.value });
    }
  };
  sendAnnounce = () => {
    const { firestore } = this.props;
    const { titre, description, thématique, points } = this.state;
    const annonceRef = firestore.collection("annonces").doc();
    annonceRef.set({
      titre,
      description,
      thématique,
      createur: localStorage.getItem("userId"),
      points
    });
  };
  sendFree = () => {
    const { firestore } = this.props;
    const { titre, description, thématique, points } = this.state;
    const annonceRef = firestore.collection("FreeItem").doc();
    annonceRef.set({
      nom : (Math.floor(Math.random() * 50000)),
      description: (Math.floor(Math.random() * 50000)),
      prix: (Math.floor(Math.random() * 50000))
     
    });
  };
  

  allStateAreFill = () => {
    const { titre, description, thématique, points } = this.state;
    if (titre && description && thématique && points) {
      return true;
    }
    this.setState({
      errorMessage: " Tous les champs sont requis"
    });
    return false;
  };
  validateAnnounce() {
    if (this.allStateAreFill()) {
      this.sendAnnounce();
    }
  }

  getThématiqueFromDB = () => {
    const { firestore } = this.props;

    const themRef = firestore.collection("category").doc("thématique");
    const thématique = [];
    themRef.get().then(document => {
      const dbCategory = document.data();

      for (const [, value] of Object.entries(dbCategory)) {
        thématique.push(`${value}`);
        console.log(value)
      }

      this.setState({
        thématiquelist: thématique
      });
    });
  };

  render() {
    const { description, errorMessage,  points, thématiquelist, thématique, titre } = this.state;
    return (
      <div>
        {" "}
        <h1>Créer une annonce</h1>{" "}
        <div>  
        <TextField
          required
          id="filled-multiline-flexible"
          label="titre" 
          value={titre}
         
          rows="1"
          onChange={this.handleChange("titre")}
          className="textField"
         
        /></div>
        <div>
        <TextField
          required
          id="filled-multiline-flexible"
          label="Description"
          value={description}
          multiline
          rows="2"
          onChange={this.handleChange("description")}
          className="textField"
          style={{ marginTop: "2%", marginBottom: "5%", width: "30%" }}
        /></div>

        <div> 
        <TextField
          required
        
          label="Points"
          value={points}
          rows="1"
          id="formatted-numberformat-input"
          onChange={this.handleChange("points")}
          className="textField"
        /></div>
        <div> 
        <p>{errorMessage}</p> </div>
        <div>
        <SelectField
          name={"thématique"}
          choices={thématiquelist}
          handleChange={this.handleChange}
          value={thématique}
        /> </div>
        <Button onClick={() => {this.sendAnnounce()}} >Publier </Button>
      </div>
    );
  }
}

export default withFirebaseContext(CreateAnnonce);
