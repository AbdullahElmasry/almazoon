import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import { axiosInstance } from '@/pages/admin';

const Index = () => {
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null
  });

  

  useEffect(() => {
    const checkAdminAuthentication = async () => {
      try {
        const response = await axiosInstance.get('/api/admin/check-authentication', {
          withCredentials: true
        })
        
        const data = response.data;
        if (!data.isAuthenticated || !data.isAdmin) {
          router.push('/admin'); // Redirect to admin login page if not authenticated as admin
        }
      } catch (error) {
        router.push('/admin')
        console.error('Errorddd:', error.message);
        // Handle error
      }
    };

    checkAdminAuthentication();
  }, []);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = name === 'image' ? files[0] : value; // For file input, use the first file
    setFormData(prevData => ({
      ...prevData,
      [name]: newValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const articleData = new FormData();
      articleData.append('title', formData.title);
      articleData.append('content', formData.content);
      articleData.append('image', formData.image);

      // Send POST request to backend with form data
      const response = await axiosInstance.post(
        '/api/articles/make-article',
        articleData,
        {
          withCredentials: true, // Include withCredentials option here
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setError('تم اضافة المقال')
    } catch (error) {
      console.error('Error creating article:', error);
      // Handle error appropriately, e.g., show error message to the user
    }
  };

      

  return (
    <Layout>
      <div className="container w-100 m-auto ">
        <form onSubmit={handleSubmit} className="w-100 mx-auto bg-red-500 p-12  rounded">
            <div className="mb-4">
            <label htmlFor="title" className="block font-medium text-lg  text-white text-end ">
                عنوان المقال
            </label>
            <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                autoComplete="off"
                required
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm p-2 text-end sm:text-sm border-gray-300 rounded-md"
            />
            </div>
            <div className="my-12">
              <label htmlFor="image" className="block text-lg font-medium text-white text-end mb-2">
                صورة المقال
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="mt-1 block w-full py-2 px-4 bg-white text-gray-800 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
            <label htmlFor="content" className="block  font-medium text-lg  text-white text-end">
                محتوي المقال
            </label>
            <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm text-end p-2 border-gray-300 rounded-md"
            ></textarea>
            </div>
            <div className="text-center">
            <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                انشر المقال
            </button>
            </div>
            <p className='text-white text-center mt-8 text-lg'>{error ? error : ''}</p>
        </form>
        </div>
    </Layout>
  )
}

export default Index
