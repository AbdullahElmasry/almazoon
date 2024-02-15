import { motion } from 'framer-motion';

const Question = ({ question, commenter, commentedAt, response }) => {
  return (
    <div className="bg-white rounded p-4 shadow-md mb-4 text-end">
      <p className="text-gray-700"> <span className='text-red-800 text-xl '>اسم المستخدم:</span> {commenter}</p>
      <p className="my-4 text-gray-500 text-sm "> <span className='text-red-800 text-xl  '>التاريخ: </span>{commentedAt} </p>
      <h2 className="text-lg font-bold mb-2"> <span className='text-red-800 text-xl '>السؤال:</span> {question}</h2>
      {response ? (
        <motion.div
          className="bg-gray-100 rounded p-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          
          
          <p className="text-gray-900"> <span className='text-red-800 text-xl '>الرد :</span> {response}  </p>
        </motion.div>
      ) : (
        <p className="text-gray-400"> سيتم الرد عليك  من المأذون قريبا</p>
      )}
    </div>
  );
};

export default Question;
