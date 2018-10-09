import axios from 'axios';

export async function postTodo(apiurl, newTodo) {
    return axios.post(apiurl, newTodo)
    .then(data => data.data)
    .catch(function (error) {
        console.log(error);
    });
}

export async function destroyTodo(apiurl, goneTodoId) {
    return axios.delete(`${apiurl}/${goneTodoId}`)
    .then(data => data)
    .catch(function (error) {
        console.log(error);
    });
}

export async function postTodoList(apiurl, newTodoList) {
    return axios.post(apiurl, newTodoList)
    .then(data => data.data)
    .catch(function (error) {
        console.log(error);
    });
}