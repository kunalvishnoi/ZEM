import React, { Component } from "react";
import superagent from "superagent";
import SideBar from "../SideBar";
import Moment from "react-moment";
import "../../App.css";
import cross from "../../cross.png";
import DOMPurify from "dompurify";
import { NavLink } from "react-router-dom";
import { setScroll, getScroll } from "./scroll";

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: [],
      individualEvent: {},
      Redirect: false,
      head: "PAST EVENTS"
    };
  }

    componentWillUnmount(){
    setScroll(window.pageYOffset);
  }
  componentDidMount() {
    let scrollValue = getScroll();
    superagent
      .get('http://3.19.26.106:8080/past/events')
      .set("Content-Type", "application/json")
      .then(res => {
        console.log(res);
        const event = res.body;
        if (event == null) {
          this.setState({
            Redirect: true
          });
        }
        this.setState({
          event: event
        });
      })
      .catch(err => {
        console.log("error", err);
      });
      window.scrollTo(0, scrollValue);
  }

  render() {
    const isRedirect = this.state.Redirect;

    return (
      <div>
        {isRedirect ? (
          <div className="bodyleft">
            <SideBar head={this.state.head} />
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "100vh" }}
            >
              <h1 className="text-white">No Past Event </h1>
            </div>
          </div>
        ) : (
          <div>
              <div className="bodyleft" style={{ paddingBottom: "150px" }}>
                <div
                  className="container-fluid"
                  style={{ PaddingBottom: "60px" }}
                >
                  <SideBar head={this.state.head} />
                  {this.state.event ? (
                  this.state.event.map(data => {
                    const date = data.date;
                    return (
                      <div
                        key={data._id}
                        className="row"
                        style={{
                          backgroundColor: "rgb(15, 140, 219)!important"
                        }}
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
                              to={`/past/${data._id}`}
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
                              to={`/past/${data._id}`}
                               >Read More
                              </NavLink>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-3">
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
                  ): null }
                </div>
              </div>
          </div>
        )}
      </div>
    );
  }
}
export default Event;
