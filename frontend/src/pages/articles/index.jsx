
import AnimatedText from '@/components/AnimatedText'
import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import TransitionEffect from '@/components/TransitionEffect'
import { axiosInstance } from '../admin'
import Head from 'next/head'

export const Project = ({ title, content, imageUrl,link }) => {
  const [image, setImage] = useState('');

  useEffect(() => {
    // Fetch image URL from your backend using Axios
    axiosInstance.get(`/uploads/${imageUrl}`)
      .then(response => {
        setImage(response.request.responseURL);
      })
  }, []);

  return (
      <>
        <Head>
          <title>اسال الماذون | الصوتيات والمرأيات</title>
          <meta name='description' content="مقالات الماذون الشرعي " />
          <meta name='keywords' content='زواج , طلاق, كتب كتاب , تصادق , رجعة , زواج اجانب , سفارة , وزارة العدل , قنصلية , الخارجية , العبور , الشروق , بدر , مدينتي , الرحاب , القاهرة' />
          <meta name='author' content='محمد البحراوي' />
        </Head>
        <motion.article
          className='w-[100%] flex  border-projects items-center  justify-center rounded-2xl border-solid border-dark bg-light p-6 relative shadow-2xl flex-col'
          initial={{
            opacity: 0,
            y: 50
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.5
          }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
        >
          <Link href={link} target='_blank' className='w-full cursor-pointer overlfow-hidden rounded-lg'>
            <Image src={image} alt={title} className='w-full h-[200px] rounded-lg' width={400}  height={200}/>
          </Link>
          <div className='w-full flex flex-col items-start justify-between mt-4 '>
            <h2 className='my-2 w-full  text-3xl font-bold text-end '>{title}</h2>
            <p className='text-primary text-right font-medium text-xl'>{content.length > 20 ? `${content.substring(0, 20)}...` : content}...</p>
            <div className='mt-2 flex items-center justify-center w-full align-center'>
              <Link href={`/articles/${link}`} target='_blank' className='ml-4 text-lg font-semibold underline hover:text-red-700  duration-300'>
                اقرأ المزيد
              </Link>
              
            </div>
          </div>
        </motion.article>
      </>
    
  );
};


const Projects = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchArticles = async (id) => {
      try {
        const response = await axiosInstance.get(`/api/articles/get-articles?page=${page}&limit=30`);
        setArticles(response.data.articles);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError('حدثت مشكلة اثناء تحميل المقالات')
      }
    };
  
    fetchArticles();
  }, [page]); // Fetch articles when page changes
  
  const loadMoreArticles = () => {
    setPage(prevPage => prevPage + 1); // Increment page to load next page of articles
  };
  
  


  return (
    <>
      <Head>
        <title>اسال الماذون | المقالات</title>
        <meta name='description' content='about page' />
      </Head>
      <TransitionEffect />
      <main>
        <Layout className='pt-16 mb-16 flex flex-col items-center justify-center'>
  
          <AnimatedText text="الصوتيات والمرئيات" className='mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl' />
          {/* <SearchBar /> */}
          <div className='grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0'>
            
            {articles.map(article => (
            <div className="col-span-6 sm:col-span-12 text-end " key={article._id}>
                <Project
                    title={article.title}
                    imageUrl={article.image}
                    content={article.content}
                    link={article._id}
                  />
            </div>
            ))}
            
            <p className='text-xl text-white my-6'>{ error ?error : '' }</p>
           
            
          </div>
          {/* pagination */}
          <div className='w-full flex justify-center mt-8'>
            <button onClick={loadMoreArticles} className='m-auto  bg-gray-200 hover:text-white hover:bg-red-500 rounded transition duration-300 ease-in-out  py-4 px-8'>Load More</button>
          </div>
        </Layout>
      </main>
    </>
  );
};

export default Projects;
