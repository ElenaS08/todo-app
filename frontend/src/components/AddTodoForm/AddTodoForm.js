// Libraries import
import React, { useState } from 'react';
import axios from 'axios';

// Styles import
import './AddTodoForm.css';

export default function AddTodoForm(props) {
	const handleCountRequests = props.handleCountRequests;
	const [description, setDescription] = useState('');

	const handleAddTodo = async (event) => {
		event.preventDefault(); // block the form from submitting

		try {
			if (description) {
				await axios.post('/create-todo', { description: description });
				setDescription(''); // empty the field after the new todo has been added
				handleCountRequests(); // increment the request count
			}
		} catch (error) {
			console.error(`There was a problem with your request: ${error}`);
		}
	};

	return (
		<form className="addTodoForm" onSubmit={handleAddTodo}>
			<input
				type="text"
				placeholder="New Todo"
				value={description}
				onChange={(event) => setDescription(event.target.value)}
			/>
		</form>
	);
}
