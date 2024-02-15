import React from 'react'
import Layout from './Layout'
import { Footer } from 'flowbite-react';
import { IoLogoWhatsapp } from 'react-icons/io';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

const Foooter = () => {
  return (
    <div className='w-full border-t-2 border-solid border-dark font-medium
    text-lg sm:text-base  '>
      <Layout classname='py-8 flex items-center justify-between  lg:py-6  text-white bg-slate-900'>
        
  
        <div className='text-xl'>
          <Footer.Title title="الصفحات" className='text-lg ' />
          <Footer.LinkGroup col>
            <Footer.Link href="/" className='hover:text-red-600 duration-300'>الصفحة الرئيسية</Footer.Link>
            <Footer.Link href="/questions" className='hover:text-red-600 duration-300'> اسأل المأذون</Footer.Link>
            <Footer.Link href="/articles" className='hover:text-red-600 duration-300'> الصوتيات والمرئيات</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <div >
          <Footer.Title title="تواصل مع المأذون" className='text-xl' />
          <Footer.LinkGroup col>
            <Footer.Link href="https://api.whatsapp.com/send?phone=1210633886" ><IoLogoWhatsapp className='text-gray-800 hover:text-green-800 duration-300 text-3xl'/> </Footer.Link>
            <Footer.Link href="'https://www.facebook.com/Bahrawy111?mibextid=2JQ9oc"><FaFacebook className='text-gray-800 text-3xl hover:text-blue-900 duration-300' /></Footer.Link>
            <Footer.Link href="https://www.tiktok.com/@mohamedelbahrawy76?_t=8jbhDoDxL9C&_r=1"><FaTiktok className='text-gray-800 text-3xl hover:text-black-900 duration-300' /></Footer.Link>
            <Footer.Link href="https://www.instagram.com/mo7amed.elba7rawy?igsh=M2R2aDBoMm9pNjJk&utm_source=qr"><FaInstagram className='text-gray-800 text-3xl hover:text-red-700 duration-300' /></Footer.Link>
          </Footer.LinkGroup>
        </div>
      </Layout>
      <div className='w-full text-center text-white bg-slate-900 '>
        <span>{new Date().getFullYear()} &copy; All right Reserved. </span>
      </div>
    </div>
  )
}

export default Foooter