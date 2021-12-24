import React, { useEffect, useState } from 'react';
import CustomCard from './CustomCard';
import PrivateNavbar from './PrivateNavbar';
import AddButton from './AddButton';
import axios from 'axios';
import folder from '../images/folder.jpg';
import '../styles/cards.css';

const Folders = ({ displayNavbar }) => {
	const [folders, setFolders] = useState([]);

	const getFolders = async () => {
		await axios
			.get('/api/folders', { headers: { 'x-auth-token': localStorage['x-auth-token'] } })
			.then(response => {
				console.log('Get Folders Response: ', response);
				setFolders(response.data);
			})
			.catch(error => console.error('Error: ', error.response.data));
	}

	const addNewFolder = (newFolder) => {
		setFolders([...folders, newFolder]);
	}

	useEffect(() => {
		getFolders();
	}, []);

	return(
		<>
			{displayNavbar && <PrivateNavbar />}
			<h1>Folders</h1>
			<div className="card-grid">
				{folders.map(f => <CustomCard key={f._id} name={f.name} description={f.description} img={folder} />)}
				<AddButton type="folder" addNewFolder={addNewFolder} />
			</div>
		</>
	);
}

export default Folders;