import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Features from './pages/Features';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/dashboard/Dashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import RobotPage from './pages/RobotPage';

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Routes>
              {/* Public routes */}
              <Route
                path="/"
                element={
                  <>
                    <Navbar />
                    <main className="flex-grow">
                      <Home />
                    </main>
                    <Footer />
                  </>
                }
              />
              <Route
                path="/fonctionnalites"
                element={
                  <>
                    <Navbar />
                    <main className="flex-grow">
                      <Features />
                    </main>
                    <Footer />
                  </>
                }
              />
              <Route
                path="/faq"
                element={
                  <>
                    <Navbar />
                    <main className="flex-grow">
                      <FAQ />
                    </main>
                    <Footer />
                  </>
                }
              />
              <Route
                path="/contact"
                element={
                  <>
                    <Navbar />
                    <main className="flex-grow">
                      <Contact />
                    </main>
                    <Footer />
                  </>
                }
              />
              <Route path="/connexion" element={<SignIn />} />
              <Route path="/inscription" element={<SignUp />} />

              {/* Robot page */}
              <Route
                path="/robot/:robotId"
                element={
                  <PrivateRoute>
                    <RobotPage />
                  </PrivateRoute>
                }
              />

              {/* Protected routes */}
              <Route
                path="/dashboard/*"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/*"
                element={
                  <PrivateRoute requireAdmin>
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}