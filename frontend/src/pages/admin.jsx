import Link from 'next/link'
import {  useState } from "react"
import axios from 'axios';
import { useRouter } from 'next/router';


export const axiosInstance = axios.create({
  baseURL: process.env.server, // Replace your_backend_port with the actual port of your backend
});



const Admin = () => {
  const [error, setError] = useState("error")
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault()
    const form = e.target;
    const email = form.email.value
    const password = form.password.value
    
    try {
      setLoading(true);
      const response = await axiosInstance.post('/api/admin/login', { email, password }, { withCredentials: true });
      console.log('success');
      router.push('dashboard')
      // Handle response as needed (e.g., redirect to another page)
    } catch (error) {
      console.error('Error occurred:', error);
      console.log('error');
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
    
  }



  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl sm:w-[80%] m-auto md:w-[60%] lg:w-[60%] xl:w-[60%] 2xl:w-[50%]"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-12 sm:w-[80%] m-auto md:w-[60%] lg:w-[60%] xl:w-[60%] 2xl:w-[50%] ">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">admin login</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <form onSubmit={handleLogin} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    className="peer sm:h-8 sm:text-sm h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Email address"
                  />
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="peer h-10 sm:h-8 sm:text-sm w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Password"
                  />
                </div>
                
                <div className="relative">
                  <button className="bg-blue-500 text-white rounded-md px-2 py-1">
                    Login
                  </button>
                </div>
              </form>
            </div>
            <hr />
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
