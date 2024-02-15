import { axiosInstance } from '@/pages/admin';
import { motion } from 'framer-motion';
import { useState } from 'react';

const AdminQuestion = ({ question, commenter, commentedAt, response, id }) => {
  const [error, setError] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const form = e.target;
    const newResponse = form.response.value; // Renamed variable to avoid conflict
  
    try {
      const response = await axiosInstance.post(`/api/questions/${id}/edit-response`, 
    { 
      response: newResponse,
    },
    { 
      withCredentials: true
    });
      setError('تم اضافة الرد ينجاح')
      
    } catch (error) {
      setError('حدثت مشكلة اثناء اضافة الرد')
    }
  };
  
  return (
    <div className="bg-white rounded p-4 shadow-md mb-4 text-end ">
      <p className="text-gray-700"> <span className='text-red-800 text-xl '>اسم المستخدم:</span> {commenter}</p>
      <p className="text-gray-500 text-sm"> <span className='text-red-800 text-xl '>التاريخ: </span>{commentedAt} </p>
      <h2 className="text-lg font-bold mb-2"> <span className='text-red-800 text-xl '>السؤال:</span> {question}</h2>
      {response ? (
        <motion.div
          className="bg-gray-100 rounded p-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          
          
          <p className="text-gray-900"> الرد: {response} </p>
          
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit}>
            
            <textarea name="response" id="response" cols="10" rows="2" className='border-4 block w-full text-end p-2'>

            </textarea>
            <button
            type="submit"
            className="ml-2 px-4 py-2 mt-12 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-blue-600"
            >
            اجب عن الفتوي
            </button>
            <p className='text-red-800 text-center text-lg'>{error ? error : ''}</p>
          </form>
      )}
    </div>
  );
};

export default AdminQuestion;
