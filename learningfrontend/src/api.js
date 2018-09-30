import axios from 'axios';
const APIURL = 'http://167.99.180.165/api/todos';

export async function postTodo(newTodo) {
    return axios.post(APIURL, newTodo)
    .then(data => data.data)
    .catch(function (error) {
        console.log(error);
    });
}

export async function destroyTodo(goneTodoId) {
    return axios.delete(`${APIURL}/${goneTodoId}`)
    .then(data => data)
    .catch(function (error) {
        console.log(error);
    });
}