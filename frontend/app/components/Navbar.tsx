import { Link, useLocation } from 'react-router';

export function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link to="/" className="text-white text-xl font-bold">
            IoT Bootcamp
          </Link>

          {/* Nav Links */}
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className={`text-white hover:bg-gray-700 px-3 py-2 rounded transition ${
                isActive('/') ? 'bg-gray-700' : ''
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/projects/1"
              className={`text-white hover:bg-gray-700 px-3 py-2 rounded transition ${
                location.pathname.startsWith('/projects') ? 'bg-gray-700' : ''
              }`}
            >
              Projects
            </Link>
            <Link
              to="/feeds"
              className={`text-white hover:bg-gray-700 px-3 py-2 rounded transition ${
                isActive('/feeds') ? 'bg-gray-700' : ''
              }`}
            >
              Feeds
            </Link>
            <Link
              to="/devices"
              className={`text-white hover:bg-gray-700 px-3 py-2 rounded transition ${
                isActive('/devices') ? 'bg-gray-700' : ''
              }`}
            >
              Devices
            </Link>
            <Link
              to="/settings"
              className={`text-white hover:bg-gray-700 px-3 py-2 rounded transition ${
                isActive('/settings') ? 'bg-gray-700' : ''
              }`}
            >
              Settings
            </Link>

            {/* User Avatar */}
            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white ml-4">
              A
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
