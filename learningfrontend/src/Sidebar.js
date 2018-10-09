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
          routes: [
            {
              name: "Home",
              path: "/",
              exact: true,
              sidebar: () => <TodoInput handleEnter={this.addTodoList}/>,
              main: () => <h2>Home</h2>
            }
          ]
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
          sidebar: () => <div>{list.todoListName}</div>,
          main: () => <TodoList apiurl={`http://167.99.180.165/api/todolists/${list._id}`} />
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

  render() {
    const routes = this.state.routes;
    
    return(
        <Router>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  padding: "10px",
                  width: "40%",
                  background: "#f0f0f0"
                }}
              >
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  {routes.map((route, index) => (
                    <li>
                      <Link to={route.path}>
                        {route.name}
                      </Link>
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

              <div style={{ flex: 1, padding: "10px" }}>
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