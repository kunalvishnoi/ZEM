import React, { Component } from "react";
import superagent from "superagent";
import NavBar from "../NavBar";
import footer from "../../footer.png";
import { Redirect } from "react-router-dom";
import "../../App.css";
import login from "../../login.gif";

const URL = process.env.REACT_APP_URL;

class Create extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      submit: "",
      error: "",
      redirect: false,
      head: "USERNAME"
    };
  }
  componentDidMount() {
    const name = localStorage.getItem("name");
    if (name !== "Society_name") {
      this.setState({
        redirect: false
      });
    }
  }
  getAuthenticationToken() {
    return localStorage.getItem("token");
  }
  handleNameChanged = event => {
    this.setState({
      username: event.target.value
    });
  };

  submitForm = event => {
    event.preventDefault();
    const payload = {
      name: this.state.username
    };
    superagent
      .post('http://3.19.26.106:8080/user')
      .set("x-auth", this.getAuthenticationToken())
      .send(payload)
      .then(res => {
        this.setState({
          redirect: true,
          submit: "Submit Successfully"
        });
      })
      .catch(err => {
        this.setState({
          error: "Failed"
        });
      });
  };
  render() {
    const redirect = this.state.redirect;
    return (
      <div className="bodyleft">
        {redirect ? (
          <Redirect
            to={{
              pathname: "/"
            }}
          />
        ) : (
          <div>
            <NavBar head={this.state.head} />
            <form onSubmit={this.submitForm}>
              <div
                className="d-flex align-items-center text-white create_height"
                id="loginform"
                style={{
                  backgroundColor: "rgb(41, 39, 37)",
                  flexDirection: "column",
                  minHeight: "100vh",
                  paddingTop: "15vh"
                }}
              >
                <h2>Enter Username</h2>
                <br />
                <img
                  src={login}
                  width="150px"
                  className="rounded-circle"
                  style={{ marginBottom: "15px" }}
                  alt="login"
                />
                <input
                  type="text"
                  className="form-control"
                  value={this.state.name}
                  onChange={this.handleNameChanged}
                  placeholder="Enter Society/Faculty Name"
                />
                <br />
                <br />
                <button className="login-button text-center" type="submit">
                  SUBMIT
                </button>
                <br />
                <p className="text-center" style={{ color: "#fff" }}>
                  {this.state.submit}
                </p>
                <p className="text-center" style={{ color: "#fff" }}>
                  {this.state.error}
                </p>
                <br />
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default Create;
