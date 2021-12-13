import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Folders = (props) => {
	const [folderInput, setFolderInput] = useState({ name: undefined, description: undefined });
	const [folders, setFolders] = useState([]);

	const handleChange = (e) => {
		e.preventDefault();
		setFolderInput({...folderInput, [e.target.name]: e.target.value });
	}

	const getFolders = async () => {
		await axios
			.get('/api/folders', { headers: { 'x-auth-token': localStorage['x-auth-token'] } })
			.then(response => {
				console.log('Get Folders Response: ', response);
				setFolders(response.data);
			})
			.catch(error => console.error('Error: ', error));
	}

	const addFolder = async (e) => {
		e.preventDefault();
		await axios
			.post('/api/folders', folderInput, { headers: { 'x-auth-token': localStorage['x-auth-token'] } })
			.then(response => {
				console.log('Add Folder Response: ', response)
				setFolders([...folders, response.data]);
			})
			.catch(error => console.error('Error: ', error));
	}

	useEffect(() => {
		getFolders();
	}, []);

	return(
		<div className="container">
			<h1>Folders</h1>
			<table className="table">
				<thead>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Description</th>
					</tr>
				</thead>
				<tbody>
					{folders.map(f =>
					<tr key={f._id}>
						<td>{f.name}</td>
						<td>{f.description}</td>
					</tr>
				)}
				</tbody>
			</table>
			{props.canAddFolder && <form>
				<label>
					<p>Name</p>
					<input type="name" name="name" onChange={handleChange} />
				</label>
				<label>
					<p>Description</p>
					<input type="description" name="description" onChange={handleChange} />
				</label>
				<div>
					<button type="submit" onClick={addFolder}>Add Folder</button>
				</div>
			</form>}
		</div>
	);
}

export default Folders;