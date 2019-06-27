import React, { Component } from "react";
import { withRouter } from "react-router";
import Button from "@material-ui/core/Button";
import ArrowBack from "@material-ui/icons/ArrowBack";
import LargeAvatar from "./LargeAvatar";
import withFirebaseContext from "../../Firebase/withFirebaseContext";
import StarIcon from "@material-ui/icons/Star";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import CompIcons from "./CompIcons";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      error: null
    };
  }

  componentDidMount() {
    const { firestore } = this.props;
    let docRef;
    if (localStorage.getItem("userId")) {
      docRef = firestore.doc(`usersinfo/${localStorage.getItem("userId")}`);
      this.getInfo(docRef);
    } else {
      const { auth } = this.props;
      auth.onAuthStateChanged(user => {
        if (user) {
          docRef = firestore.doc(`usersinfo/${user.uid}`);
          this.getInfo(docRef);
        }
      });
    }
  }

  getInfo = docRef => {
    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          const userInfo = doc.data();
          this.setState({
            userInfo
          });
        }
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  logout = () => {
    const { auth } = this.props;
    const { history } = this.props;

    auth.signOut().then(
      () => {
        history.push("/signup");
      },
      error => {
        console.log(error);
      }
    );
  };

  redirect = url => {
    const { history } = this.props;
    history.push({
      pathname: url,
      state: { parcours: true }
    });
  };

  render() {
    const mapArray = new Array(3).fill(3);
    const { userInfo, error } = this.state;
    return (
      <div>
        <ArrowBack
          style={{ position: "fixed", left: "10%", top: "2%" }}
          onClick={() => {
            this.redirect("/dashboard");
          }}
        />
        <LargeAvatar />
        {mapArray.map(x => (
          <StarIcon style={{ width: "40px", height: "40px" }} />
        ))}
        <div>
          <TextField
            disabled
            multiline
            rows="5"
            style={{
              border: "2px solid black",
              marginTop: "30px",
              borderRadius: "10px"
            }}
          >
            blablausertextbio{" "}
          </TextField>{" "}
        </div>

        {mapArray.map(x => (
          <CompIcons />
        ))}
        {userInfo ? (
          <>
            <p>{userInfo.name}</p>
            <p>
              <img
                style={{ width: "90%" }}
                alt="Profil img"
                src={
                  userInfo.url
                    ? userInfo.url
                    : "http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png"
                }
              />
            </p>
            <p style={{ border: "2px solid black" }}>
              {" "}
              {userInfo.bio ? userInfo.bio : "Pas renseigné"}
            </p>
            ) }
            <Button
              size="large"
              type="button"
              color="primary"
              onClick={this.logout}
              variant="contained"
              style={{
                margin: "30px 0 30px 0",
                width: "300px"
              }}
              className="Button"
            >
              Log Out
            </Button>
            {error && <p>{error.message}</p>}
          </>
        ) : (
          <>
            <p>Loading your info</p>
            <Button
              size="large"
              type="button"
              color="primary"
              onClick={this.logout}
              variant="contained"
              style={{
                position: "fixed center",
                marginTop: "8%",
                borderRadius: "20px"
              }}
              className="Button"
            >
              Log Out
            </Button>
          </>
        )}
      </div>
    );
  }
}

export default withRouter(withFirebaseContext(Profile));
