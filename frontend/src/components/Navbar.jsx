"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/router';
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';

const CustomLink = ({ href, title, className = "" }) => {

  const router = useRouter();

  return (
    <Link href={href} className={`${className} relative group`}>
      {title}
      <span
        className={`h-[1px] inline-block  bg-red-800
              absolute left-0 -bottom-0.5
              group-hover:w-full transition-width ease duration-300
              ${router.asPath === href ? 'w-full' : 'w-0'} `}
      >
        &nbsp;
      </span>
    </Link>
  );
};
  
const CustomMobileLink = ({ href, title, className = "", toggle }) => {

  const router = useRouter();

  const handleClick = () =>{
    toggle()
    router.push(href);

  }


  return (
    <button href={href} className={`${className} relative group text-light `} 
      onClick={handleClick}
    >
      {title}
      <span
        className={`h-[1px] inline-block   bg-red-800
              absolute left-0 -bottom-0.5
              group-hover:w-full transition-width ease duration-300
              ${router.asPath === href ? 'w-full' : 'w-0'} `}
      >
        &nbsp;
      </span>
    </button>
  );
};


const Navbar = () => {
  const [isOpen, seIsOpen] = useState(false)

  const handleClick = ()=> {
    seIsOpen(!isOpen)
  }

  return (
    <header className='w-full  px-32 lg:px-20 md:px-20 sm:px-16 py-8 font-medium flex items-center justify-between relative bg-gray-300 '>

      {/* البرجر يمعلم */}
      <button className=' flex-col justify-center align-center hidden lg:flex' onClick={handleClick} >
        <span className={` bg-dark block h-0.5 transition-all duration-300 ease-out  w-6 rounded-sm -translate-y-0.5 ${isOpen ? 'rotate-45 translate-y-1 ': '-translate-y-0.5'}`}></span>
        <span className={` bg-dark block h-0.5 transition-all duration-300 ease-out  w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'} `}></span>
        <span className={` bg-dark block h-0.5 transition-all duration-300 ease-out  w-6 rounded-sm -translate-y-0.5 ${isOpen ? '-rotate-45 -translate-y-1 ': 'translate-y-0.5'}`}></span>
      </button>

      {/* mobile header icons */}
      <div className=' items-center justify-center hidden lg:flex'>
            <motion.a href='https://api.whatsapp.com/send?phone=1210633886' target='_blank'
                whileHover={{y:-2}}
                whileTap={{scale:0.9}}
                className='w-6 mr-3'
            >
                <IoLogoWhatsapp className='text-green-800 text-2xl'/>

            </motion.a>
            <motion.a href='https://www.facebook.com/Bahrawy111?mibextid=2JQ9oc' target='_blank'
                whileHover={{y:-2}}
                whileTap={{scale:0.9}}
                className='w-6 mr-3'
            >
                <FaFacebook className='text-blue-800 text-2xl' />
            </motion.a>
            <motion.a href='https://www.instagram.com/mo7amed.elba7rawy?igsh=M2R2aDBoMm9pNjJk&utm_source=qr' target='_blank'
                whileHover={{y:-2}}
                whileTap={{scale:0.9}}
                className='w-6 mr-3'
            >
                <FaInstagram className='text-blue-800 text-2xl' />
            </motion.a>
            <motion.a href='https://www.tiktok.com/@mohamedelbahrawy76?_t=8jbhDoDxL9C&_r=1' target='_blank'
                whileHover={{y:-2}}
                whileTap={{scale:0.9}}
                className='w-6 mr-3'
            >
                <FaTiktok className='text-black text-2xl' />
            </motion.a>
           
      </div>

      {/* desktop nav links */}
      <div className='w-full flex justify-between items-center lg:hidden'>
        

        {/* desktop and mobile header icons */}
        <nav className='flex items-center justify-center flex-wrap'>
      
            <motion.a href='https://api.whatsapp.com/send?phone=1210633886' target='_blank'
                whileHover={{y:-2}}
                whileTap={{scale:0.9}}
                className='w-6 mr-3'
            >
                <IoLogoWhatsapp className='text-green-800 text-2xl' />
            </motion.a>
            <motion.a href='https://www.tiktok.com/@mohamedelbahrawy76?_t=8jbhDoDxL9C&_r=1' target='_blank'
                whileHover={{y:-2}}
                whileTap={{scale:0.9}}
                className='w-6 mr-3'
            >
                <FaTiktok className='text-black text-2xl' />
            </motion.a>
            <motion.a href='https://www.instagram.com/mo7amed.elba7rawy?igsh=M2R2aDBoMm9pNjJk&utm_source=qr' target='_blank'
                whileHover={{y:-2}}
                whileTap={{scale:0.9}}
                className='w-6 mr-3'
            >
                <FaInstagram  className='text-red-600 text-2xl' />
            </motion.a>
            <motion.a href='https://www.facebook.com/Bahrawy111?mibextid=2JQ9oc' target='_blank'
                whileHover={{y:-2}}
                whileTap={{scale:0.9}}
                className='w-6 mr-3'
            >
                <FaFacebook className='text-blue-800 text-2xl' />
            </motion.a>
            
        </nav>
        <nav>
            <CustomLink href= "/" title="الصفحة الرئيسية" className='mr-4' />
            <CustomLink href= "/questions" title="اسأل المأذون" className='mx-4'/>
            <CustomLink href= "/articles" title="الصوتيات والمرأيات" className='mx-4'/>
        </nav>
      </div>
      {/* mbile nav container */}
      <AnimatePresence>
      {
        isOpen &&(
          
            <motion.div className='min-w-[70%]  z-30 flex-col fixed flex justify-between items-center  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark/90 rounded-lg backdrop-blur-md py-32'
              initial={{
                opacity:0,
                y:-50,
                x: "-50%"
              }}
              animate={{
                opacity:1,
                y:"-50%",
                x: "-50%"
              }}
              exit={{
                opacity: 0,
                y: -50,
                x: "-50%",
                transition: {
                  duration: 0.1
                }
              }}
            >
              <nav className='flex items-center flex-col justify-center '>
                  <CustomMobileLink href= "/" title="الصفحة الرئيسية" className='my-2'  toggle={handleClick} />
                  <CustomMobileLink href= "/questions" title="اسأل الماذون" className='my-2' toggle={handleClick} />
                  <CustomMobileLink href= "/articles" title="الصوتيات والمرأيات" className='my-2'  toggle={handleClick} />
              </nav>
              <h1 className='mt-12 text-red-500 text-2xl'>01014848671</h1>
              
            </motion.div>
        )
      }
      </AnimatePresence>
      
      
    </header>
  )
}

export default Navbar
