import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const FolderForm = ({ addNewFolder, handleCloseModal }) => {
    const [folderInput, setFolderInput] = useState({});
	const [errorMessage, setErrorMessage] = useState(null);

    const handleChange = (e) => {
		e.preventDefault();
		setFolderInput({...folderInput, [e.target.id]: e.target.value });   // TODO: check case where a description is entered, then deleted then submitted
	}

	const clearInputs = () => {
		document.getElementById('folder-name').value = '';
		document.getElementById('folder-description').value = '';
		setFolderInput({});
	}

    const createFolder = async (e) => {
        e.preventDefault();

        console.log(folderInput);

        await axios
            .post('/api/folders', {
                name: folderInput['folder-name'],
                description: folderInput['folder-description']
            }, { headers: { 'x-auth-token': localStorage['x-auth-token'] } })
            .then(response => {
                    console.log('Create Folder Response: ', response);
                    clearInputs();
                    addNewFolder(response.data);
                    handleCloseModal();
                }
            )
            .catch(error => {
                    console.error(error);
                    setErrorMessage(error.response.data);
                }
            )
    }

    return(
        <>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Folder Name</Form.Label>
                    <Form.Control id="folder-name" type="text" placeholder="Enter Name" onChange={handleChange} />
                    <Form.Label>Folder Description</Form.Label>
                    <Form.Control id="folder-description" type="text" placeholder="Enter Description (optional)" onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={createFolder}>
                    Create Folder
                </Button>
            </Form>
            {errorMessage && <p>{errorMessage}</p>}
        </>
    );
}

export default FolderForm;