import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Book from './pages/book';
import UserProfile from './pages/userProfile';
import Authentication from './pages/authentication';
import Review from './pages/review';
import AddBook from './pages/addBook';
import RequireAdmin from './Authenticate/RequireAdmin';
import RequireAuth from './Authenticate/RequireAuth';
import { AuthProvider } from './contexts/AuthContext';
function App() {


  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/auth' element={<Authentication />} />
            <Route path='/books/:id' element={<Book />} />
            <Route path='/users/:id' element={
            <RequireAuth><UserProfile /></RequireAuth>} />
            <Route path='/reviews/:id' element={
           <RequireAuth> <Review /></RequireAuth>} />

            <Route
              path="/add-book"
              element={
                <RequireAuth>
                  <RequireAdmin>
                    <AddBook />
                  </RequireAdmin>
                </RequireAuth>
              }
            />

          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
