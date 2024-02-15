import AnimatedText from '@/components/AnimatedText'
import Layout from '@/components/Layout'
import Head from 'next/head'
import React, {useEffect, useState } from 'react'
import TransitionEffect from '@/components/TransitionEffect'
import Accordion from '@/components/Accordion'
import Question from '@/components/Question'
import { axiosInstance } from './admin'
import { useRouter } from 'next/router';

const About = () => {
      const [data, setData] = useState([])
      const [loading, setLoading] = useState()
      const [LoadingQuestions, setLoadingQuestions] = useState()
      const [errorQuestions, setErrorQuestions] = useState()
      const [error, setError] = useState('')
      const [page, setPage] = useState(1);

      const router = useRouter();

      const [formData, setFormData] = useState({
        name: '',
        question: '',
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();        
        try {
            setLoading(true);
            const response = await axiosInstance.post('/api/questions/create-question',formData);
            setError('تم اضافة سؤالك بنجاح')
          } catch (error) {
            setError('حصلت مشكلة اثناء اضافة سؤالك');
          } finally {
            setLoading(false);
            setTimeout(() => {
              router.reload();
            }, 1500);
          }
      };

      useEffect(() => {
         const fetchQuestoins = async ()=>{
            try {
                setLoadingQuestions(true);
                const response = await axiosInstance.get(`/api/questions/get-questions?page=${page}&limit=30`);
                setData(response.data.data)
                
              } catch (error) {
              setErrorQuestions('فشل تحميل الاسئلة')
              } finally {
               setLoadingQuestions(false);
              }
        }
        fetchQuestoins()
      
      },[page])

      const loadMoreArticles = () => {
        setPage(prevPage => prevPage + 1); // Increment page to load next page of articles
      };

  return (
    <div>
        <Head>
          <title>الماذون | اسأل المأذون</title>
          <meta name='description' content="اسأل المأذون الشرعي الدكتور محمد البحراوي وهيتم الرد عليك " />
          <meta name='keywords' content='زواج , طلاق, كتب كتاب , تصادق , رجعة , زواج اجانب , سفارة , وزارة العدل , قنصلية , الخارجية , العبور , الشروق , بدر , مدينتي , الرحاب , القاهرة' />
          <meta name='author' content='محمد البحراوي' />
        </Head>
        <TransitionEffect />
        <main className='flex w-full flex-col items-center justify-center'>
            <Layout classname='pt-16'>
                <AnimatedText text=" اسأل المأذون" className='mb-16 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8 ' />
                
                
                <h1 className='text-3xl text-end text-red-600'>الاسئلة الشائعة</h1>
                
                <br />
                
                <div>
                <Accordion title="ما هي شروط صحة الزواج؟" content="ان تكون الزوجة غير محرمه علي من يريد الزواج بها باي سبب من اسباب التحريم وان يحضر عقد الزواج شاهد ان رجلان " />
                <Accordion title="ما يصلح ان يكون مهرا" content="يكون المهر من الذهب او الفضة المضروبين وغير مضروبين وان يكون مهرا كل شيء معلوم له قيمه ماليه من عقار او منقول سواء مكيال أو موزون او حيوان او من منافع الاعيان مثل المنازل او الاراضي كل ما له قيمه ماليه  " />
                <Accordion title=" ما هي النتائج المترتبة على عدم توثيق عقد الزواج ؟" content="يترتب على ذلك عدم حصول الزوجة على أي حقوق ناشئة عن عقد الزوج إلا إثبات النسب للأطفال ." />
                <Accordion title="ما هي اجراءات توثيق عقد الزواج في مصر ؟" content="يقوم المأذون بتوثيق عقد الزواج في المحكمة في الدفاتر المعدة لذلك و يحصل بعدها الزوجين على صور رسمية موثقة من قسيمة الزواج من المأذون .  -اما المأذون فإنه يقوم بإعطاء الزوجين شهادة أو إفادة تفيد بحدوث الزواج حتى يتسنى للزوجين قضاء شهر العسل في الفنادق بذلك الإثبات الشرعي للزواج " />
                <Accordion title="كيف يمكن الحصول على شهادة زواج كمبيوتر او شهادة زواج مميكنة ؟" content="يتم التوجه بصورة من قسيمة الزواج إلى السجل المدني المميكن لاستصدار شهادة الزواج المميكنة" />
                <Accordion title="هل يمكن وضع شروط في عقد الزواج ؟" content="نعم يمكن وضع شروط على الزوج في عقد الزواج مثل اشتراط عدم الزواج بأخرى و اشتراط عمل الزوجة بعد الزواج او ان تحتفظ بعملها" />
                {/* <Accordion title="" content=" " /> */}
                    {/* السؤال */}

                <h1 className='text-5xl text-center my-12 '>اترك سؤالك</h1>
                <div className="container mx-auto">
                    
                    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-red-500 p-12 rounded">
                        <div className="mb-4">
                        <label htmlFor="name" className="block font-medium text-white text-end text-lg">
                            الاسم
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            autoComplete="name"
                            required
                            className="mt-1 text-end focus:ring-indigo-500 border-none p-3  focus:border-indigo-500 focus:outline-0 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                        </div>
                        <div className="mb-4">
                        <label htmlFor="question" className="block  font-medium text-white text-end focus:outline-0 text-lg">
                            السؤال
                        </label>
                        <textarea
                            id="question"
                            name="question"
                            value={formData.question}
                            onChange={handleChange}
                            required
                            className="mt-1 focus:ring-indigo-500  p-3 text-end focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        ></textarea>
                        </div>
                        <div className="text-center">
                          <p className='text-xl text-white my-6'>{ loading ? 'جاري التحميل' : error }</p>
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            اٍسأل المأذون
                        </button>
                        </div>
                    </form>
                    </div>
                <h1 className='text-5xl text-center my-12 '>الأسئلة</h1>
                <p className='text-xl text-red-800 my-6'>{LoadingQuestions && 'جاري تحميل الاسئلة'}</p>
                <p className='text-xl text-red-800 my-6'>{errorQuestions ? errorQuestions : ''}</p>
                {
                    data.map((q)=> (
                        <div className='my-12' key={q._id}>
                            <Question 
                            question={q.question}
                            commenter={q.name}
                            commentedAt={q.createdAt}
                            response={q.response}
                        />
                        </div>
                    ))
                }

                </div>
                <div className='w-full flex justify-center mt-8'>
                  <button onClick={loadMoreArticles} className='m-auto  bg-gray-200 hover:text-white hover:bg-red-500 rounded transition duration-300 ease-in-out  py-4 px-8'>Load More</button>
                </div>
            </Layout>
        </main>
    </div>
  )
}

export default About
