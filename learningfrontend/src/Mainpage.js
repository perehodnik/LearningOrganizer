import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TodoInput from './TodoInput';

class Mainpage extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand main-component">
        <div className="container-fluid">
          {this.props.currentUser ? 
          (<TodoInput 
                handleEnter={this.props.addTodoList}
                placeholder="todolist"
          />
          ):
          (     <div className="button-opacity">
                <Link className="btn btn-primary button-margin" to="/signin">Signin</Link>
                <Link className="btn btn-secondary button-margin" to="/signup">Signup</Link>
                </div>
          )
          }
        </div>
      </nav>
    );
  }
}

export default Mainpage;