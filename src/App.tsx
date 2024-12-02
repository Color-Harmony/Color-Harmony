import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/Header';
import { RequireAuth } from './components/RequireAuth';
import { Advertisement } from './components/Advertisement';
import Home from './pages/Home';
import Harmonies from './pages/Harmonies';
import Palettes from './pages/Palettes';
import Login from './pages/Login';
import Membership from './pages/Membership';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-grow container mx-auto mt-8 px-4 pb-12">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/membership" element={<Membership />} />
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <Home />
                  </RequireAuth>
                }
              />
              <Route
                path="/harmonies"
                element={
                  <RequireAuth>
                    <Harmonies />
                  </RequireAuth>
                }
              />
              <Route
                path="/palettes"
                element={
                  <RequireAuth>
                    <Palettes />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </main>
          <Advertisement />
          <footer className="bg-white border-t border-gray-200 py-6">
            <div className="container mx-auto px-4">
              <div className="text-center text-gray-600">
                <p className="mb-2">© 2024 Color Harmony. Todos los derechos reservados.</p>
                <p className="text-sm">
                  Desarrollador:{' '}
                  <span className="font-semibold">José Norberto Salazar Diaz</span>
                </p>
                <p className="text-sm">
                  Autoras:{' '}
                  <span className="font-semibold">Mariam Valeria Ramos López</span> y{' '}
                  <span className="font-semibold">Xochilt Betzabel Valenzuela López</span>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;