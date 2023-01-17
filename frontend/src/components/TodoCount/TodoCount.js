// Libraries import
import React from 'react';

// Styles import
import './TodoCount.css';

export default function TodoCount(props) {
	const todos = props.todos;
	const completeTodos = todos.filter((todo) => todo.completed);
	const openTodos = todos.filter((todo) => !todo.completed);

	return (
		<div className="todoCount">
			<p className="todoCount-text">
				You have {openTodos.length} open and {completeTodos.length} complete todos.
			</p>
		</div>
	);
}
