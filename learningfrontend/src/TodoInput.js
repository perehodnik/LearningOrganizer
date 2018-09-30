import React, {Component} from 'react';
const APIURL = 'http://167.99.180.165/api/todos';

class TodoInput extends Component {
    constructor(props){
        super(props);
        //this.state = {
        //    name: ''
        //}
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    handleKeyPress (e) {
        if (e.key === 'Enter' && e.target.value) {
            this.props.handleEnter({name: e.target.value});
            e.target.value = '';
        }
    }
    render() {        
        return(
             <input placeHolder="add new todo"
             type="text" 
             onKeyPress={this.handleKeyPress}
             />
            );
    }
}

export default TodoInput;



