export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F4F6F9] text-[#1E3A8A] px-4">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl font-semibold mb-2">Page Not Found</p>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          Oops! The page you are looking for doesn’t exist or has been moved.
        </p>
        <a
          href="/"
          className="bg-[#FFC107] text-[#1E3A8A] px-6 py-3 rounded-lg shadow hover:bg-[#FFD54F] transition duration-300"
        >
          Go Back Home
        </a>
      </div>
    );
  }
  