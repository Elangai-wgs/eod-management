import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const UnauthorizedAccess = () => {
  const navigate = useNavigate()

  useEffect(() => {
    console.log("Unauthorized access page mounted");
    // Redirect to login after a short delay, or based on your logic
    const timer = setTimeout(() => {
      history.push('/login');
    }, 3000); // Redirects after 3 seconds

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [history]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <FaExclamationTriangle size={64} className="text-orange-500 mb-4" />
      <h1 className="text-4xl font-bold mb-4">401 - Unauthorized Access</h1>
      <p className="text-lg mb-8">You do not have permission to view this page. Redirecting to login...</p>
      <div
        onClick={() => navigate('/login')}
        className="cursor-pointer text-orange-500 hover:text-orange-700"
      >
        Go to Login Now 
      </div>
    </div>
  );
};

export default UnauthorizedAccess;
