// Libraries import
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Styles import
import './App.css';

// Components import
import AddTodoForm from './components/AddTodoForm/AddTodoForm';
import TodoList from './components/TodoList/TodoList';
import TodoCount from './components/TodoCount/TodoCount';

// Set default base URL for axios requests
axios.defaults.baseURL = 'http://localhost:8080';

function App() {
	const [todos, setTodos] = useState([]);
	const [countRequests, setCountRequests] = useState(0); // this state property is incremented each time a new request is being made to the server
	const handleCountRequests = () => {
		setCountRequests(countRequests + 1);
	};

	useEffect(() => {
		async function fetchTodos() {
			try {
				const response = await axios.get('/todos');

				setTodos(response.data);
			} catch (error) {
				console.error(`There was a problem with your request: ${error}`);
			}
		}
		fetchTodos();
	}, [countRequests]); // retrigger this useEffect to get the updated list of todos after each request

	return (
		<div className="app">
			<div className="container">
				<h1 className="title">TODO App</h1>
				<AddTodoForm handleCountRequests={handleCountRequests} />
				<TodoList todos={todos} handleCountRequests={handleCountRequests} />
				{todos.length > 0 ? <TodoCount todos={todos} /> : null}
			</div>
		</div>
	);
}

export default App;
