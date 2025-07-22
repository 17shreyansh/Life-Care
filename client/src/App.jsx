import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/shared/ProtectedRoute';
import NotFound from './pages/public/NotFound';
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
import CounsellorsDemo from './pages/public/CounsellorsDemo';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import VerifyOTP from './pages/auth/VerifyOTP';

// Client Pages
import ClientDashboard from './pages/client/Dashboard';
import Counsellors from './pages/client/Counsellors';
import BookAppointment from './pages/client/BookAppointment';
import MyAppointments from './pages/client/MyAppointments';
import ChatVideo from './pages/client/ChatVideo';
import Payments from './pages/client/Payments';
import Feedback from './pages/client/Feedback';
import Profile from './pages/client/Profile';

// Counsellor Pages
import CounsellorDashboard from './pages/counsellor/Dashboard';
import CounsellorAppointments from './pages/counsellor/Appointments';
import CounsellorAvailability from './pages/counsellor/Availability';
import CounsellorEarnings from './pages/counsellor/Earnings';
import CounsellorProfile from './pages/counsellor/Profile';
import CounsellorContent from './pages/counsellor/Content';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminCounsellors from './pages/admin/Counsellors';
import AdminAppointments from './pages/admin/Appointments';
import AdminWithdrawals from './pages/admin/Withdrawals';
import AdminContent from './pages/admin/Content';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes with MainLayout */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="blog" element={<Blog />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="videos" element={<Videos />} />
            <Route path="contact" element={<Contact />} />
          </Route>
          
          {/* Auth Routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="verify-otp" element={<VerifyOTP />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:resetToken" element={<ResetPassword />} />

          {/* Client Routes with DashboardLayout */}
          <Route element={<ProtectedRoute allowedRoles={['client']} />}>
            <Route path="/client" element={<DashboardLayout role="client" />}>
              <Route path="dashboard" element={<ClientDashboard />} />
              <Route path="counsellors" element={<Counsellors />} />
              <Route path="book-appointment/:counsellorId" element={<BookAppointment />} />
              <Route path="appointments" element={<MyAppointments />} />
              <Route path="chat-video" element={<ChatVideo />} />
              <Route path="payments" element={<Payments />} />
              <Route path="feedback" element={<Feedback />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>

          {/* Counsellor Routes with DashboardLayout */}
          <Route element={<ProtectedRoute allowedRoles={['counsellor']} />}>
            <Route path="/counsellor" element={<DashboardLayout role="counsellor" />}>
              <Route path="dashboard" element={<CounsellorDashboard />} />
              <Route path="appointments" element={<CounsellorAppointments />} />
              <Route path="availability" element={<CounsellorAvailability />} />
              <Route path="earnings" element={<CounsellorEarnings />} />
              <Route path="profile" element={<CounsellorProfile />} />
              <Route path="content" element={<CounsellorContent />} />
            </Route>
          </Route>

          {/* Admin Routes with DashboardLayout */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<DashboardLayout role="admin" />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="counsellors" element={<AdminCounsellors />} />
              <Route path="appointments" element={<AdminAppointments />} />
              <Route path="withdrawals" element={<AdminWithdrawals />} />
              <Route path="content" element={<AdminContent />} />
            </Route>
          </Route>
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;