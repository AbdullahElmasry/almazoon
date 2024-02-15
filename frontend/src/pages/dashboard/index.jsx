'use client';
import { useRouter } from 'next/router';
import AdminQuestion from '@/components/AdminQuestion';
import Layout from './Layout';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../admin';

const Dashboard = () => {
  const [data, setData] = useState([])

  const router = useRouter();

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
  }, [router]);


  useEffect(() => {
    const fetchQuestoins = async ()=>{
       try {
           const response = await axiosInstance.get('/api/questions/get-questions');
           setData(response.data.data)
           
         } catch (error) {
           console.error('Error submitting question:', error);
         }
   }
   fetchQuestoins()
 
 },[])
  
  return (
    <Layout>
      {
        data.map((q)=>(
      <div className='block bg-gray-400 p-12 w-100%' key={q._id}>
        <AdminQuestion
            key={q._id}
            id={q._id}
            question={q.question}
            commenter={q.name}
            commentedAt={q.createdAt}
            response={q.response}
        />
      </div>
        ))
      }
    </Layout>
  )
}

export default Dashboard
