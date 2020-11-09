import React from 'react';
import './App.css';
import uuid from 'react-uuid';
import { nanoid } from 'nanoid';

function App() {
	const users = [
		{id: 1, name: 'user1', surn: 'surn1', age: 30},
		{id: 2, name: 'user2', surn: 'surn2', age: 31},
		{id: 3, name: 'user3', surn: 'surn3', age: 32},
	];

	let [idNanoid] 	= React.useState(nanoid);
	console.log(idNanoid);

	let id 			= uuid();
	console.log(id);

	const result = users.map((user) => {
		let id 			= uuid();
		return (
			<tr key={id} data-value={id}>
				<td>{user.name}</td>
				<td>{user.surn}</td>
				<td>{user.age}</td>
			</tr>
		);
	});

	return (
		<table>
			<tbody>
				<tr>
					<td>Имя</td>
					<td>Фамилия</td>
					<td>Возраст</td>
				</tr>
				{result}
			</tbody>
		</table>
	);
};

export default App;
