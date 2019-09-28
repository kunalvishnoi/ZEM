import React, { Component } from "react";
import superagent from "superagent";
import SideBar from "../SideBar";
import Moment from "react-moment";
import "../../App.css";
import bell from "../../bell.png";
import belltwo from "../../bell2.png";
import cross from "../../cross.png";
import tune from "../../tune.mp3";
import DOMPurify from "dompurify";
import { NavLink } from "react-router-dom";
import { setScroll, getScroll } from "./scroll";
import HomeLoader from '../home-loader'

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: [],
      individualEvent: {},
      loading: true,
      head: "EVENT MANAGER"
    };
  }

  ImageChange(id) {
    var music = new Audio(tune);
    const user_id = localStorage.getItem("userId");
    const event_id = id;
    const senddata = {
      user_id: user_id,
      event_id: event_id
    };
    if (user_id !== "null" && event_id) {
      superagent
        .post('http://3.19.26.106:8080/')
        .set("Content-Type", "application/json")
        .send(senddata)
        .then(res => {
          music.play();
          document.getElementById(id).src = bell;
          let notices = localStorage.getItem("notices");
          if (notices) {
            notices = notices.split(",");
            notices.push(id);
            localStorage.setItem("notices", notices);
          } else {
            notices = new Array();
            notices.push(id);
            localStorage.setItem("notices", notices);
          }

        })
        .catch(err => {
          if(err.response.text=='Already subscribed for this event.'){
            alert(err.response.text);
          }
          else{
            alert(err);
          }
        });
    }
  }
  componentDidMount() {
    let scrollValue = getScroll();
    superagent
      .get('http://3.19.26.106:8080/')
      .set("Content-Type", "application/json")
      .then(res => {
        const event = res.body;
        this.setState({ event: event , loading: false });

        window.scrollTo(0, scrollValue);
      })
      .catch(err => {
        console.log("error", err);
      });
  }
   componentWillUnmount(){
    setScroll(window.pageYOffset);
  }

  render() {
    const { loading } = this.state; 

    return (
      <div>
          <div className="bodyleft" style={{ paddingBottom: "150px" }}>
            <div className="container-fluid" style={{ PaddingBottom: "60px" }}>
              <SideBar head={this.state.head} />
              { loading ? (
                <div className="row">
                  <div className="col-md-12">
                    <HomeLoader loading={loading} />
                  </div>
                  
                </div>
                ) : (

              this.state.event ? (
              this.state.event.map(data => {
                const date = data.date;
                let notices = localStorage.getItem("notices");
                let isNotified = false;
                if (notices) {
                  notices = notices.split(",");
                  if (notices.indexOf(data._id) >= 0) {
                    isNotified = true;
                  }
                }
                return (
                  <div
                    key={data._id}
                    className="row"
                    style={{ backgroundColor: "rgb(15, 140, 219)!important" }}
                  >
                    <div className="col-9">
                      <div className="web">
                        <div className="row">
                          <div className="col-md-5">
                            <h6
                              style={{
                                textTransform: "capitalize",
                                marginBottom: "0.35rem",
                                fontWeight: "bold"
                              }}
                              className="name"
                            >
                              {data.name}
                            </h6>
                            <NavLink
                             className="btn btn-link w-25 d-none d-md-block"
                              to={`/event/${data._id}`}
                              >Read More
                            </NavLink>
                          </div>
                          <div className="col-md-3">
                            <p
                              style={{ marginBottom: "0.35rem" }}
                              className="society"
                            >
                              {data.creatorname}
                            </p>
                          </div>
                          <div className="col-md-3 text-center">
                            <p className="eventdate d-none d-md-block">
                              <Moment format="DD MMM YYYY">{date}</Moment>
                            </p>
                             <NavLink
                              className="btn btn-link w-50 d-block d-md-none"
                              to={`/event/${data._id}`}
                              >
                              Read More
                              </NavLink>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-3">
                      <button
                        className="bell"
                        onClick={this.ImageChange.bind(this, data._id)}
                        style={{ float: "right" }}
                      >
                        {isNotified ? (
                          <img
                            src={bell}
                            id={data._id}
                            style={{ marginTop: "10px" }}
                            width="40px"
                            height="40px"
                            alt="notified"
                          />
                        ) : (
                          <img
                            src={belltwo}
                            id={data._id}
                            width="40px"
                            style={{ marginTop: "10px" }}
                            height="40px"
                            alt="notify me"
                          />
                        )}
                      </button>
                      <div className="d-block d-md-none">
                        <br />
                        <br />
                      </div>
                      <p
                        className="eventdate d-block d-md-none"
                        style={{ textAlign: "right" }}
                      >
                        <Moment format="DD MMM">{date}</Moment>
                      </p>
                    </div>
                  </div>
                );
              })
): null)}
            </div>
          </div>
      </div>
    );
  }
}
export default Event;
