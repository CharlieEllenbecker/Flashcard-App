import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFolders } from '../state/actions/folderActions';
import PrivateNavbar from './PrivateNavbar';
import CustomCard from './CustomCard';
// import AddFolderButton from './AddFolderButton';
import axios from 'axios';
import folder from '../images/folder.jpg';
import '../styles/styles.css';

const Folders = () => {
	const { folders } = useSelector((state) => state.folderReducer);
	console.log('Folders: ', folders);
	const dispatch = useDispatch();

	const fetchFolders = async () => {
		await axios
			.get('/api/folders', { headers: { 'x-auth-token': localStorage['x-auth-token'] } })
			.then(response => {
				console.log('Get Folders Response: ', response);
				dispatch(setFolders(response.data));
			})
			.catch(error => console.error('Error: ', error.response.data));
	}

	useEffect(() => {
		fetchFolders();
	}, []);

	return(
		<>
			<PrivateNavbar />
			<h1>Folders</h1>
			<div className="card-grid">
				{folders.map(f => <CustomCard key={f._id} name={f.name} description={f.description} img={folder} />)}
				{/* <AddFolderButton /> */}
			</div>
		</>
	);
}

export default Folders;