import React, {Component} from 'react';
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';
import * as apiCalls from './api';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        }
        this.addTodo = this.addTodo.bind(this);
    }
    componentWillMount(){
        this.loadTodos();
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
    async loadTodos(){
        const requestOptions = {
            method: 'GET',
            headers: this.authHeader()
        };
        await fetch(this.props.apiurl, requestOptions)
        .then(data => data.json())
        .then(todos => this.setState({todos}));
    }
    async addTodo (newTodo) {
        let addedTodo = await apiCalls.postTodo(this.props.apiurl, {name: newTodo});
        this.setState({todos: [...this.state.todos, addedTodo]});
    }
    async deleteTodo (goneTodoId) {
        await apiCalls.destroyTodo(this.props.apiurl, goneTodoId);
        const todos = this.state.todos.filter(todo => todo._id !==goneTodoId);
        this.setState({todos: todos});
    }
    render() {
        const todos = this.state.todos.map((t) => (
            <TodoItem
              key={t._id}
              {...t}
              onDelete={this.deleteTodo.bind(this, t._id)}
            />
            ));
        
        return(
            <div id="container">
                <ul>
                    <h1>{this.props.name}</h1>
                    <TodoInput 
                        handleEnter={this.addTodo}
                        placeholder="todo"
                    />
                    {todos}
                </ul>
            </div>
            );
    }
}

export default TodoList;
