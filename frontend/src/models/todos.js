import axios from "axios";
// const axios = require("axios");


const url = "http://localhost:8000";

const getTodos = async () => {
  const response = await axios.get(`${url}/todos`);
  console.log(response.data);
  return response.data;
}

const getTodosByState = async (state) => {
  let result;
  let response;

  switch (state) {
    case "false":
      response = await axios.get(`${url}/todos/notDone`);
      console.log(response.data);
      return response.data;
    case "true":
      response = await axios.get(`${url}/todos/done`);
      console.log(response.data);
      return response.data;
    case "reviewed":
      response = await axios.get(`${url}/todos/done`);
      result = response.data.filter((todo) => {
        if (todo.review) { return true; }
        else { return false; }
      });
      return result;
  }
}

const createTodo = async (todo) => {
  try {
    const response = await axios.post(`${url}/todos`, todo);
    console.log(response);
    return response.data;
  } catch (e) { console.error(e); }
}

const deleteTodo = async (id) => {
  const response = await axios.delete(`${url}/todos/${id}`);
  console.log(response);
  return response.data;
}

const updateTodo = async (id, todo) => {
  const response = await axios.patch(`${url}/todos/${id}`, todo);
  console.log(response);
  return response.data;
}

const toggleTodoState = async (id) => {
  const response = await axios.patch(`${url}/todos/toggle/${id}`);
  console.log(response);
  return response.data;
}


export {
  getTodos,
  getTodosByState,
  createTodo,
  deleteTodo,
  updateTodo,
  toggleTodoState
};