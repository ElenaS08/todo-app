// Libraries import
import React from 'react';
import axios from 'axios';
import { FaCheck, FaRegTrashAlt } from 'react-icons/fa';

// Style import
import './Todo.css';

export default function Todo(props) {
	const item = props.item;
	const handleCountRequests = props.handleCountRequests;
	const handleCompleteTodo = async () => {
		try {
			await axios.put(`/todo/${item.id}`, { completed: !item.completed });
			handleCountRequests(); // increment the request count
		} catch (error) {
			console.error(`There was a problem with your request: ${error}`);
		}
	};
	const handleDelete = async () => {
		try {
			await axios.delete(`/todo/${item.id}`);
			handleCountRequests(); // increment the request count
		} catch (error) {
			console.error(`There was a problem with your request: ${error}`);
		}
	};

	return (
		<div className={`todo ${item.completed ? 'todo-complete' : ''}`}>
			<div className="todo-check">
				<input
					type="checkbox"
					className="todo-checkbox"
					checked={item.completed}
					onChange={handleCompleteTodo}
				/>
				<i className="todo-checkmark">
					<FaCheck />
				</i>
			</div>
			<span className="todo-description">{item.description}</span>
			<button className="todo-delete" onClick={handleDelete}>
				<FaRegTrashAlt size={32} />
			</button>
		</div>
	);
}
