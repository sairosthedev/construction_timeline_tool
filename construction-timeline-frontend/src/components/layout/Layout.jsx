import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Layout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold">Construction Timeline</Link>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Link to="/projects" className="hover:text-blue-600">Projects</Link>
                  <Link to="/predict" className="hover:text-blue-600">Predictions</Link>
                  <button onClick={logout} className="hover:text-red-600">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="hover:text-blue-600">Login</Link>
                  <Link to="/register" className="hover:text-blue-600">Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;