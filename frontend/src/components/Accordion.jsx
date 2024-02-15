
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoIosArrowDown } from 'react-icons/io';

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border p-4 border-gray-300 rounded mb-2 text-end ">
      <div
        className="flex items-center justify-between cursor-pointer اجابة السؤال "
        onClick={() => setIsOpen(!isOpen)}
      >
        <IoIosArrowDown
          className={`transform ${isOpen ? 'rotate-180' : ''} transition-transform duration-300`}
        />
        <span className='text-xl'>{title}</span>
        
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className=" border-t  border-gray-300 text-red-600 "
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
