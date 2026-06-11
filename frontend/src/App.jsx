import { useContext } from 'react'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Footer from './Components/Footer'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Profile from './Pages/Profile'
import About from './Pages/About'
import Contact from './Pages/Contact'
import { AuthContext } from './Context/AuthContextValue'

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext)

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return children
}

const PublicRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext)

  if (currentUser) {
    return <Navigate to="/" replace />
  }

  return children
}

const App = () => {
  const { currentUser } = useContext(AuthContext)

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
              <Footer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
              <Footer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
              <Footer />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to={currentUser ? "/" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
