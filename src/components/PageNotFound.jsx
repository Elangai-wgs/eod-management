import { useEffect } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const PageNotFound = () => {
  useEffect(()=>{console.log("page is mounted")},[])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <FaExclamationTriangle size={64} className="text-orange-500 mb-4" />
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-8">The page you are looking for does not exist or you do not have permission to view it.</p>
      <div
        onClick={() => window.history.back()}
        className="cursor-pointer text-orange-500 hover:text-orange-700"
      >
        Go Back to Home
      </div>
    </div>
  );
};

export default PageNotFound;
