import { axiosInstance } from '@/pages/admin';
import { motion } from 'framer-motion';
import { useState } from 'react';

const QuestionDelete = ({ question, commenter, commentedAt, response, id }) => {
    const [error, setError] = useState('')
    const handleDelete = async(e)  => {
        try {
            await axiosInstance.delete(`/api/questions/${id}/delete-question`, {
              withCredentials: true
            });
            setError('تم حذف السؤال')
          } catch (error) {
            setError('فشل حذف السؤال')
          }
        };
    
  return (
    <div className='flex container bg-white'>
        <p className='w-[20%] text-red-800 p-12 text-center shadow-md  cursor-pointer' onClick={handleDelete}>مسح سؤال</p>
        <div className="bg-white rounded p-4  mb-4 text-end w-[80%]">
            <p className="text-gray-700 cursor-pointer" onClick={handleDelete} > <span className='text-red-800 text-xl '>اسم المستخدم:</span> {commenter}</p>
            <p className="text-gray-500 text-sm"> <span className='text-red-800 text-xl '>التاريخ: </span>{commentedAt} </p>
            <h2 className="text-lg font-bold mb-2"> <span className='text-red-800 text-xl '>السؤال:</span> {question}</h2>
            {response ? (
                <motion.div
                className="bg-gray-100 rounded p-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                >
                
                
                <p className="text-gray-900"> الرد: {response}</p>
                </motion.div>
            ) : (
                <p className="text-gray-400"> سيتم الرد عليك  من المأذون قريبا</p>
            )}
            <p className='text-red-800 text-center text-lg mt-4'>{error ? error : ''}</p>
        </div>
        
    </div>
  )
}

export default QuestionDelete
