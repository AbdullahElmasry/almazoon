import { useState } from 'react';
import { axiosInstance } from './admin';
const AdminRegister = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
  
    const handleRegister = async (e) => {
      e.preventDefault();
      try {
        const response = await axiosInstance.post('/api/admin/register', {
          email,
          password,
        });
  
        const data = response.data;
  
        if (data.success) {
          // Registration successful
          setSuccess(true);
          setError('');
        } else {
          // Registration failed, display error message
          setError(data.message);
        }
      } catch (error) {
        console.error('Error:', error.message);
        setError('An error occurred while processing your request');
      }
    };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl sm:w-[80%] m-auto md:w-[60%] lg:w-[60%] xl:w-[60%] 2xl:w-[50%]"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-12 sm:w-[80%] m-auto md:w-[60%] lg:w-[60%] xl:w-[60%] 2xl:w-[50%] ">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Admin register</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <form onSubmit={handleRegister} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="peer sm:h-8 sm:text-sm h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Email address"
                  />
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="peer h-10 sm:h-8 sm:text-sm w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Password"
                  />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <div className="relative">
                  <button className="bg-blue-500 text-white rounded-md px-2 py-1">
                    register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
