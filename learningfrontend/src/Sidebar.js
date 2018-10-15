import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TodoList from './TodoList';
import TodoInput from './TodoInput';
import * as apiCalls from './api';

// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.


class Sidebar extends Component {
  constructor(props) {
      super(props);
      this.state = {
          main: {
            name: "Home",
            path: "/",
            exact: true,
            sidebar: () => "",
            main: () => <div>
                          <h2>Home</h2>
                          <TodoInput 
                            handleEnter={this.addTodoList}
                            placeholder="todolist"
                          />
                        </div>
          },
          routes: []
      }
      this.apiurl = 'http://167.99.180.165/api/todolists';
      this.addTodoList = this.addTodoList.bind(this);
  }
  componentWillMount(){
      this.retrieveTodolists();
  } 
  retrieveTodolists(){
    fetch(this.apiurl)
    .then(res => res.json())
    .then(todoListArray => (
      todoListArray.map(list => (
        {
          name: list.todoListName,
          path: `/${list.todoListName}`,
          exact: true,
          sidebar: () => <div>{list._id}</div>,
          main: () => <TodoList 
              apiurl={`http://167.99.180.165/api/todolists/${list._id}`}
              name={list.todoListName}
          />,
          id: list._id
        }
      ))))
    .then(todoListArray => this.setState({routes: [...this.state.routes, ...todoListArray]}));
  }
  async addTodoList (newTodoList) {
    let reply = await apiCalls.postTodoList(this.apiurl, {todoListName: newTodoList});
    console.log(reply);
    let addedTodoList = {
        name: reply.todoListName,
        path: `/${reply.todoListName}`,
        exact: true,
        sidebar: () => <div>{reply.todoListName}</div>,
        main: () => <TodoList apiurl={`http://167.99.180.165/api/todolists/${reply._id}`} />
    }
    this.setState({routes: [...this.state.routes, addedTodoList]});
  }
  async deleteTodoList (goneTodoListId) {
    await apiCalls.destroyTodoList(this.apiurl, goneTodoListId);
    const routes = this.state.routes.filter(route => route.id !==goneTodoListId);
    this.setState({routes});
  }

  render() {
    const routes = this.state.routes;
    const mainPage = this.state.main;
    
    return(
        <Router>
            <div style={{ display: "flex" }}>
              <div id="sidebar-div">
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  <li id="nav-list">
                    <Link to={mainPage.path}>
                      {mainPage.name}
                    </Link>
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

                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.sidebar}
                  />
                ))}
              </div>

              <div id="content-div">
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
              </div>
            </div>
          </Router>
        );
  }
}

export default Sidebar;