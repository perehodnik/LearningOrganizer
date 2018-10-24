import React, {Component} from 'react';

const TodoItem = ({name, onDelete}) => 
        (<li className="todoitem"><span onClick={onDelete}><i className="fa fa-trash"></i></span>
            {name}
         </li>
);

export default TodoItem;
