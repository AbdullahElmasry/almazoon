import { Sidebar } from 'flowbite-react';
import Link from 'next/link';
import React from 'react';
import { axiosInstance } from '../admin';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {

  const router = useRouter()

  const handleClick = async()=>{
    try {
      const response = await axiosInstance.get('/sign-out',{
        withCredentials: true
      })
      router.replace('/admin')
      
    } catch (error) {
      console.error('something went wrong')
    }

  }
  return (
    <div className='flex '>
      <Sidebar aria-label="Sidebar with multi-level dropdown example" className='h-[100vh]'>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <div className='text-xl flex flex-col text-center text-white'>
              <Link href="/dashboard" className='mt-6'>اجب علي الأسئلة</Link>
              <Link href="/dashboard/delete-question" className='mt-6'> مسح سؤال</Link>
              <Link href="/dashboard/delete-article" className='mt-6'>مسح فتوي</Link>
              <Link href="/dashboard/add-article" className='my-6'>اضافة فتوي</Link>
              <p className='cursor-pointer' onClick={handleClick}>تسجيل الخروج</p>
            </div>
            
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <main style={{flex:'1'}}>{children}</main>
    </div>
  );
};

export default Layout;
