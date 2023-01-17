// Libraries import
import React from 'react';

// Components import
import Todo from '../Todo/Todo';

// Style imports
import './TodoList.css';

export default function TodoList(props) {
	const todos = props.todos;
	const handleCountRequests = props.handleCountRequests;

	return (
		<>
			{todos.length > 0 ? (
				<div className="todoList">
					{todos.map((todo) => (
						<Todo key={todo.id} item={todo} handleCountRequests={handleCountRequests} />
					))}
				</div>
			) : null}
		</>
	);
}
