import React, { useState } from 'react';

function App() {
	const [name, setName] 			= useState('Иван');
	const [surname, setSurname] 	= useState('Иванов');
	const [age, setAge] 			= useState(30);
	const [isBanned, setIsBanned]	= useState(false);

	function changeSurname(){
		setSurname('Петров');
	};
	
	return <div>
		<p>{name} {surname}, возраст: {age}. {!isBanned ? 'Не забанен!' : 'Забанен!'} </p>
		<button onClick={() => setName('Петя')}>Изменить имя</button>
		<button onClick={changeSurname}>Изменить фамилию</button><br/>
		<button onClick={() => setIsBanned(!isBanned)}>{!isBanned ? 'Забанить пользователя!' : 'Разбанить пользователя!'}</button><br/>
		<button onClick={() => setAge(age + 1)}>Увеличить возраст</button>
		<button onClick={() => setAge(age - 1)}>Уменьшить возраст</button>
	</div>;
}

export default App;