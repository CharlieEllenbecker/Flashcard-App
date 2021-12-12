import Home from './Home';
import Auth from './Auth';
import Folders from './Folders';
import Dashboard from './Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import auth from '../services/auth';  // utilize it here?

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/folders" element={<Folders />} />
          <Route path="*" element={() => "404 NOT FOUND"} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;