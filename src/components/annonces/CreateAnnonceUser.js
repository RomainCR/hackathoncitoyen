import React from "react";
import withFirebaseContext from "../../Firebase/withFirebaseContext";
import SelectField from "./SelectFields";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import { withRouter } from 'react-router';

class CreateAnnonceUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      titre: "",
      description: "",
      thematique: [],
      thematiquelist: []
    };
  }

  componentDidMount() {
    this.getthematiqueFromDB();
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  sendAnnounce = () => {
    const { firestore, history } = this.props;
    const { titre, description, thematique } = this.state;
    const annonceRef = firestore.collection("annoncesUser").doc();
    annonceRef.set({
      titre,
      description,
      thematique,
      createur: localStorage.getItem("userId"),
      postulants : []
    });
    history.push('/dashboard');
  };

  allStateAreFill = () => {
    const { titre, description, thematique } = this.state;
    if (titre && description && thematique) {
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

  getthematiqueFromDB = () => {
    const { firestore } = this.props;

    const themRef = firestore.collection("category").doc("thematique");
    const thematique = [];
    themRef.get().then(document => {
      const dbCategory = document.data();

      for (const [, value] of Object.entries(dbCategory)) {
        thematique.push(`${value}`);
        console.log(value);
      }

      this.setState({
        thematiquelist: thematique
      });
    });
  };

  render() {
    const {
      description,
      errorMessage,

      thematiquelist,
      thematique,
      titre
    } = this.state;
    return (
      <div>
        {" "}
        <h1>Faire une suggestion à votre ville</h1>{" "}
        <div>
          <TextField
            required
            id="filled-multiline-flexible"
            label="titre"
            value={titre}
            rows="1"
            onChange={this.handleChange("titre")}
            className="textField"
          />
        </div>
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
          />
        </div>
        <div>
          <p>{errorMessage}</p>{" "}
        </div>
        <div>
          <SelectField
            name={"thematique"}
            choices={thematiquelist}
            handleChange={this.handleChange}
            value={thematique}
          />{" "}
        </div>
        <Button
          onClick={() => {
            this.sendAnnounce();
          }}
        >
          Proposer{" "}
        </Button>
      </div>
    );
  }
}

export default withRouter(withFirebaseContext(CreateAnnonceUser));
