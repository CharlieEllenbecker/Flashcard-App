import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFolders } from '../state/actions/folderActions';
import PrivateNavbar from './PrivateNavbar';
import Page from './Page';
import CustomCard from './CustomCard';
import axios from 'axios';
import folder from '../images/folder.jpg';
import '../styles/styles.css';

const AllFolders = ({ showNavbar }) => {
	const { folders } = useSelector((state) => state.folderReducer);
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
			{showNavbar && <PrivateNavbar />}
			<Page title="Folders">
				<div className="card-grid">
					{folders.map(f => <CustomCard key={f._id} type="folder" img={folder} id={f._id} name={f.name} description={f.description} />)}
				</div>
			</Page>
		</>
	);
}

export default AllFolders;