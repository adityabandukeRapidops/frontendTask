import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home'
import Dashboard from './pages/dashboard'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/homePage" element={<Home />} />
          <Route exact path="/dashboard" element={<Dashboard />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
