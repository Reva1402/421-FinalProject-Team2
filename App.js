import logo from './logo.svg';
import './App.css';
import WelcomePage from './WelcomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './UserHomePage';
import AdminDashboard from './AdminDashboard';
import UserManagement from './UserManagement';
import CreateEvent from './CreateEvent';
import MyEvents from './MyEvents';
import EventDetails from './EventDetails';

function App() {
  return (
    <div>
      <Router>
      <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="userhomepage" element={<HomePage />} />
      <Route path="admin" element={<AdminDashboard />} />
      <Route path="usermanagement" element={<UserManagement />} />
      <Route path="createevent" element={<CreateEvent />} />
   <Route path="/myevents" element={<MyEvents />} />
      <Route path="/event/:id" element={<EventDetails />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
