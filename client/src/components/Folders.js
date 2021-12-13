import React, { useEffect, useState } from 'react';
import CustomCard from './CustomCard';
import CustomNavbar from './CustomNavbar';
import axios from 'axios';
import folder from '../images/folder.jpg';
import '../styles/cards.css';

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
		<>
			{props.displayNavbar && <CustomNavbar />}
			<h1>Folders</h1>
			<div className="card-grid">
				{folders.map(f => <CustomCard name={f.name} description={f.description} img={folder} />)}
			</div>
			{props.canAddFolder &&
				<form>
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
				</form>
			}
		</>
	);
}

export default Folders;