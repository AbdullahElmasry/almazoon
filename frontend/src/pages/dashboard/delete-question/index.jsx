import Layout from '../Layout'
import React, { useEffect, useState } from 'react'
import QuestionDelete from '@/components/QuestionDelete';
import { axiosInstance } from '@/pages/admin';

const Index = () => {
  const [data, setData] = useState()
  const [page, setPage] = useState(1);

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

  useEffect(() => {
    const fetchQuestoins = async ()=>{
       try {
           const response = await axiosInstance.get(`/api/questions/get-questions?page=${page}&limit=30`);
           setData(response.data.data)
           
         } catch (error) {
          //done
         } 
    }
   fetchQuestoins()
 
 },[page])

 const loadMoreArticles = () => {
   setPage(prevPage => prevPage + 1); // Increment page to load next page of articles
 };


  return (
    <Layout>
      <div className="container bg-gray-300 min-h-screen m-auto ">
        {
          data?.map((q)=>(

        <div className='mb-12 flex' key={q._id}>
            <QuestionDelete
                question={q.question}
                id={q._id}
                commenter={q.name}
                commentedAt={q.createdAt}
                response={q.response}
            />
        </div>
          )
          )}
      </div>
      <div className='w-full flex justify-center mt-8'>
        <button onClick={loadMoreArticles} className='m-auto  bg-gray-200 hover:text-white hover:bg-red-500 rounded transition duration-300 ease-in-out  py-4 mb-12  px-8'>Load More</button>
      </div>
    </Layout>
  )
}

export default Index
