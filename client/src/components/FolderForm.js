import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { addFolder } from '../state/actions/folderActions';


const FolderForm = ({ handleCloseModal }) => {
    const [folderInput, setFolderInput] = useState({});
	const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();

    const handleChange = (e) => {
		e.preventDefault();
		setFolderInput({...folderInput, [e.target.name]: e.target.value });   // TODO: check case where a description is entered, then deleted then submitted
	}

	const clearInputs = () => {
		document.getElementById('folder-name').value = '';
		document.getElementById('folder-description').value = '';
		setFolderInput({});
	}

    const handlePostFolder = async (e) => {
        e.preventDefault();
        await axios
            .post('/api/folders', {
                name: folderInput.name,
                description: folderInput.description
            }, { headers: { 'x-auth-token': localStorage['x-auth-token'] } })
            .then(response => {
                console.log('Create Folder Response: ', response);
                clearInputs();
                dispatch(addFolder(response.data));
                handleCloseModal();
            })
            .catch(error => {
                console.error('Error: ', error.response.data);
                setErrorMessage(error.response.data);
            });
    }

    return(
        <>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Folder Name</Form.Label>
                    <Form.Control id="folder-name" name="name" type="text" placeholder="Enter Name" onChange={handleChange} />
                    <Form.Label>Folder Description</Form.Label>
                    <Form.Control id="folder-description" name="description" type="text" placeholder="Enter Description (optional)" onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handlePostFolder}>
                    Create Folder
                </Button>
            </Form>
            {errorMessage && <p>{errorMessage}</p>}
        </>
    );
}

export default FolderForm;