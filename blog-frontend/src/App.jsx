import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import BlogView from './components/BlogView';
import Navbar from './components/Navbar';
import BlogListPage from './pages/BlogListPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blogs/:id" element={<BlogView />} />
        <Route path="/blogs" element={<BlogListPage />} />
      </Routes>
    </Router>
  );
}

export default App;