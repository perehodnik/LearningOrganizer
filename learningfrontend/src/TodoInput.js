import React, {Component} from 'react';
const APIURL = 'http://167.99.180.165/api/todos';

class TodoInput extends Component {
    constructor(props){
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    handleKeyPress (e) {
        if (e.key === 'Enter' && e.target.value) {
            this.props.handleEnter(e.target.value);
            e.target.value = '';
        }
    }
    render() {        
        return(
             <input placeHolder={`add new ${this.props.placeholder}`}
             type="text" 
             onKeyPress={this.handleKeyPress}
             />
            );
    }
}

export default TodoInput;



