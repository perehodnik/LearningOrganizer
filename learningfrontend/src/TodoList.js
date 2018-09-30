import React, {Component} from 'react';
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';
import * as apiCalls from './api';
const APIURL = 'http://167.99.180.165/api/todos';

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
    loadTodos(){
        fetch(APIURL)
        .then(data => data.json())
        .then(todos => this.setState({todos}));
    }
    async addTodo (newTodo) {
        let addedTodo = await apiCalls.postTodo(newTodo);
        this.setState({todos: [...this.state.todos, addedTodo]});
    }
    async deleteTodo (goneTodoId) {
        await apiCalls.destroyTodo(goneTodoId);
        const todos = this.state.todos.filter(todo => todo._id !==goneTodoId);
        this.setState({todos: todos});
    }
    render() {
        const todos = this.state.todos.map((t) => (
            <TodoItem
              key={t._id}
              {...t}
              onDelete={this.deleteTodo.bind(this,t._id)}
            />
            ));
        
        return(
            <div id="container">
                <ul>
                    <h1>To Do List</h1>
                    <TodoInput handleEnter={this.addTodo}/>
                    {todos}
                </ul>
            </div>
            );
    }
}

export default TodoList;
