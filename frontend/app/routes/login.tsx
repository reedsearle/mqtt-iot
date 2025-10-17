import { Button } from 'flowbite-react';
import { Link } from 'react-router';
import type { Route } from './+types/login';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Login - IoT Bootcamp Platform' },
    { name: 'description', content: 'Sign in to IoT Bootcamp Platform' },
  ];
}

export default function Login() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Logo placeholder */}
        <div className="mb-8 mx-auto w-48 h-20 bg-gray-300 border-2 border-gray-500 flex items-center justify-center text-2xl font-bold">
          [LOGO]
        </div>

        {/* Title and description */}
        <h1 className="text-3xl font-bold mb-4 text-gray-900">
          IoT Bootcamp Platform
        </h1>
        <p className="text-gray-600 mb-10">
          Manage your IoT projects and devices
        </p>

        {/* Google Sign In Button */}
        <Link to="/">
          <Button color="light" size="xl" className="w-full max-w-xs mx-auto">
            <span className="mr-2 text-xl">[G]</span>
            Sign in with Google
          </Button>
        </Link>

        {/* Footer text */}
        <p className="mt-8 text-xs text-gray-500">
          Use your school Google account to login
        </p>
      </div>
    </div>
  );
}
