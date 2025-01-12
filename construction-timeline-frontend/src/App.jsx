import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProjectList from './components/projects/ProjectList';
import ProjectForm from './components/projects/ProjectForm';
import PredictionForm from './components/predictions/PredictionForm';
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="home" element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="projects" element={
                <PrivateRoute>
                  <ProjectList />
                </PrivateRoute>
              } />
              <Route path="projects/new" element={
                <PrivateRoute>
                  <ProjectForm />
                </PrivateRoute>
              } />
              <Route path="projects/edit/:id" element={
                <PrivateRoute>
                  <ProjectForm />
                </PrivateRoute>
              } />
              <Route path="predict" element={
                <PrivateRoute>
                  <PredictionForm />
                </PrivateRoute>
              } />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
