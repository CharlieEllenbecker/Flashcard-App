import React, { useState, useEffect } from 'react';

function Login() {
    const [folders, setFolders] = useState([]);

    useEffect(() => {
        fetch('/api/folders')
            .then(res => res.json())
            .then(folders => setFolders(folders));
            // .catch()
    });

    return(
        <div>
            <h1>Folders</h1>
            <ul>
                {folders.map(f => <li>{f.name}</li>)}
            </ul>
        </div>
    );
}

export default Folders;