import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFolders } from '../state/actions/folderActions';
import CustomCard from './CustomCard';
import AddButton from './AddButton';
import axios from 'axios';
import folder from '../images/folder.jpg';
import '../styles/cards.css';

const Folders = () => {
	const { folders } = useSelector((state) => state.folders);
	const dispatch = useDispatch();

	const fetchFolders = async () => {
		await axios
			.get('/api/folders', { headers: { 'x-auth-token': localStorage['x-auth-token'] } })
			.then(response => {
				console.log('Get Folders Response: ', response);
				dispatch({
					type: setFolders,
					payload: {
						folders: response.data
					}
				});
			})
			.catch(error => console.error('Error: ', error.response.data));
	}

	useEffect(() => {
		fetchFolders();
	}, []);

	return(
		<>
			<h1>Folders</h1>
			<div className="card-grid">
				{folders.map(f => <CustomCard key={f._id} name={f.name} description={f.description} img={folder} />)}
				<AddButton type="folder" />
			</div>
		</>
	);
}

export default Folders;