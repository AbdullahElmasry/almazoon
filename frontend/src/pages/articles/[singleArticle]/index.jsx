import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/pages/admin';
import Head from 'next/head';

const Index = ({  }) => {
    const [article, setArticle] = useState(null);
    const [image, setImage] = useState('');

    const router = useRouter();
    const { singleArticle } = router.query;

    useEffect(() => {
      const fetchArticle = async () => {
        try {
          const response = await axiosInstance.get(`/api/articles/${singleArticle}`);
          setArticle(response.data);
        } catch (error) {
          // setError(error.response.data.error);
        } finally {
          // setLoading(false);
        }
      };
  
      fetchArticle();
    }, [singleArticle]);

    useEffect(() => {
      if (article && article.image) {
        axiosInstance.get(`/uploads/${article.image}`)
          .then(response => {
            setImage(response.request.responseURL);
          })
          .catch(error => {
            console.error('Error fetching image:', error);
          });
      }
    }, [article]);



  useEffect(() => {
    // Fetch image URL from your backend using Axios
    axiosInstance.get(`/uploads/${singleArticle}`)
      .then(response => {
        setImage(response.request.responseURL);
      })
      .catch(error => {
        console.error('Error fetching image:', error);
      });
  }, []);



    return (
      <>
      <Head>
        <title>اسال الماذون | {article?.content}</title>
        <meta name='description' content={article?.content} />
        <meta name='keywords' content='زواج , طلاق, كتب كتاب , تصادق , رجعة , زواج اجانب , سفارة , وزارة العدل , قنصلية , الخارجية , العبور , الشروق , بدر , مدينتي , الرحاب , القاهرة' />
        <meta name='author' content='محمد البحراوي' />
      </Head>

      <div className="container mx-auto px-4 min-h-screen">
        <div className="relative w-full ">
          <Image src={image} alt='article image' width={800} height={500} className="md:w-[70%] m-auto lg:w-[80] sm:w-[90%] object-cover"  />
        </div>
        <div className="mt-8 md:mt-6 sm:mt-6 text-center">
          <h1 className="text-3xl font-bold text-red-800"> {article?.title} </h1>
          <p className="mt-4 text-gray-800">{article?.content} </p>
        </div>
      </div>
      </>
    );
  };
  
  export default Index;
  