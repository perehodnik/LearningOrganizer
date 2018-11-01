import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Navbar extends Component {
  logout = e => {
    e.preventDefault();
    this.props.logout();
    this.props.history.push("/");
  };
  render() {
    return (
      <nav className="navbar navbar-expand">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand link">
              Home
            </Link>
          </div>
          {this.props.currentUser ? (
            <ul className="nav navbar-nav navbar-right">
              <li className="nav-text">
                Logged in as:
              </li>
              <li className="nav-user">
                {this.props.currentUser}
              </li>
              <li className="logout link">
                <a onClick={this.logout}>Logout</a>
              </li>
            </ul>
          ) : (
            <ul className="nav navbar-nav navbar-right">
              <li className="nav-status">
                <Link className="nav-user" to="/signup">Sign up</Link>
              </li>
              <li className="nav-status">
                <Link className="nav-user" to="/signin">Log in</Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);


