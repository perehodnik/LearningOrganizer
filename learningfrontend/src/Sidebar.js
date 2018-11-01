import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TodoList from './TodoList';
import TodoInput from './TodoInput';
import SignIn from './SignIn';
import * as apiCalls from './api';
import Navbar from './Navbar';
import Mainpage from './Mainpage';

class Sidebar extends Component {
  constructor(props) {
      super(props);
      this.state = {
          currentUser: '',
          main: {
            name: "Home",
            path: "/",
            exact: true,
            sidebar: () => "",
            main: () => <Mainpage
            addTodoList={this.addTodoList}
            currentUser={this.state.currentUser}
            />,
          },
          routes: []
      }
      this.apiurl = 'http://167.99.180.165/api/';
      this.addTodoList = this.addTodoList.bind(this);
      this.auth = this.auth.bind(this);
      this.logout = this.logout.bind(this);
  }
  componentWillMount(){
      let user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        this.setState({currentUser: user.username});
        apiCalls.setTokenHeader(user.token);
        this.retrieveTodolists();
      }
  }

  async auth(type, userData) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    };
    const apiurl = `${this.apiurl}auth/${type}`;
    await fetch(apiurl, requestOptions)
        .then((response) => response.json())
        .then((response) => {
            // login successful if there's a jwt token in the response
            if (response.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(response));
                apiCalls.setTokenHeader(response.token);
                this.setState({currentUser: response.username});
                this.retrieveTodolists();
            }
        });
    }
  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('user');
      this.setState({currentUser: '', routes: []});
      apiCalls.setTokenHeader();
  }

  authHeader() {
      // return authorization header with jwt token
      let user = JSON.parse(localStorage.getItem('user'));
  
      if (user && user.token) {
          return { 'Authorization': 'Bearer ' + user.token };
      } else {
          return {};
      }
  }
  getUserId(){
      let user = JSON.parse(localStorage.getItem('user'));
      if (user && user.id) {
        return user.id;
      }
  }
  async retrieveTodolists(){
    const requestOptions = {
      method: 'GET',
      headers: this.authHeader()
    };
    const userId = this.getUserId();
    await fetch(`${this.apiurl}users/${userId}/todolists`, requestOptions)
    .then(res => res.json())
    .then(todoListArray => (
      todoListArray.map(list => (
        {
          name: list.todoListName,
          path: `/${list.todoListName}`,
          exact: true,
          sidebar: () => <div>{list._id}</div>,
          main: () => <TodoList 
              apiurl={`${this.apiurl}users/${userId}/todolists/${list._id}`}
              name={list.todoListName}
          />,
          id: list._id
        }
      ))))
    .then(todoListArray => this.setState({routes: [...this.state.routes, ...todoListArray]}));
  }
  async addTodoList (newTodoList) {
    const userId = this.getUserId();
    let reply = await apiCalls.postTodoList(`${this.apiurl}users/${userId}/todolists`, {todoListName: newTodoList});
    console.log(reply);
    if (reply['code']) {
        alert("Please enter a unique todolist name");
    }
    else {
      let addedTodoList = {
          name: reply.todoListName,
          path: `/${reply.todoListName}`,
          exact: true,
          sidebar: () => <div>{reply.todoListName}</div>,
          main: () => <TodoList 
            apiurl={`http://167.99.180.165/api/todolists/${reply._id}`} 
            name={reply.todoListName}
            />
      }
      this.setState({routes: [...this.state.routes, addedTodoList]});
    }
  }
  async deleteTodoList (goneTodoListId) {
    const userId = this.getUserId();
    await apiCalls.destroyTodoList(`${this.apiurl}users/${userId}/todolists`, goneTodoListId);
    const routes = this.state.routes.filter(route => route.id !==goneTodoListId);
    this.setState({routes});
  }

  render() {
    const routes = this.state.routes;
    const mainPage = this.state.main;
    
    return(
        <Router>
            <div className="main-div">
              <div id="left" className="column">
                <div className="bottom">
                  <ul>
                    <li id="nav-list">
                      TODOLISTS:
                    </li>
                    {routes.map((route, index) => (
                      <li id="nav-list">
                        <Link to={route.path}>
                          {route.name}
                        </Link>
                        <i onClick={this.deleteTodoList.bind(this, route.id)} className="fa fa-trash"></i>
                      </li>
                    ))}
                  </ul>               
                </div>
              </div>

              <div className="column">
                <div>
                  <Navbar logout={this.logout} currentUser={this.state.currentUser}/>
                </div>
                <div className="bottom">
                  <Route
                      path={mainPage.path}
                      exact={mainPage.exact}
                      component={mainPage.main}
                  />
                  {routes.map((route, index) => (
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      component={route.main}
                    />
                  ))}
                  <Route 
                      path="/signin"
                      component={() => <SignIn 
                        handleSignin={this.auth}
                        signUp={false} 
                        />}                      
                  />
                  <Route 
                      path="/signup"
                      component={() => <SignIn 
                        handleSignin={this.auth}
                        signUp={true} 
                        />}                      
                  />
                </div>
              </div>
            </div>
          </Router>
        );
  }
}

export default Sidebar;