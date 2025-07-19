import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Blog from './pages/public/Blog';
import Gallery from './pages/public/Gallery';
import Videos from './pages/public/Videos';
import Contact from './pages/public/Contact';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Client Pages
import ClientDashboard from './pages/client/Dashboard';
import CounsellorList from './pages/client/CounsellorList';
import BookAppointment from './pages/client/BookAppointment';

// Counsellor Pages
import CounsellorDashboard from './pages/counsellor/Dashboard';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';

// Test Pages
import TestApi from './pages/TestApi';
import SimpleTest from './pages/SimpleTest';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes with MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="videos" element={<Videos />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Client Routes with DashboardLayout */}
        <Route path="/client" element={<DashboardLayout role="client" />}>
          <Route path="dashboard" element={<ClientDashboard />} />
          <Route path="counsellors" element={<CounsellorList />} />
          <Route path="book-appointment/:counsellorId" element={<BookAppointment />} />
          {/* Add more client routes as needed */}
        </Route>

        {/* Counsellor Routes with DashboardLayout */}
        <Route path="/counsellor" element={<DashboardLayout role="counsellor" />}>
          <Route path="dashboard" element={<CounsellorDashboard />} />
          {/* Add more counsellor routes as needed */}
        </Route>

        {/* Admin Routes with DashboardLayout */}
        <Route path="/admin" element={<DashboardLayout role="admin" />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          {/* Add more admin routes as needed */}
        </Route>

        {/* Test Routes */}
        <Route path="/test" element={<TestApi />} />
        <Route path="/simple-test" element={<SimpleTest />} />
      </Routes>
    </Router>
  );
}

export default App;