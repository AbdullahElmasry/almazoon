import Layout from '@/components/Layout'
import Head from 'next/head'
import Image from 'next/image'
import almaazoon1 from '../../public/images/profile/almazon1.jpg'
import almaazoonBanner from '../../public/images/profile/banner-almazoon.png'
import AnimatedText from '@/components/AnimatedText'
import Link from 'next/link'
import TransitionEffect from '@/components/TransitionEffect'
export default function Home() {
  return (
    <>
      <Head>
        <title>اسال الماذون | الصفحة الرئيسية</title>
        <meta name='description' content="المأذون الشرعى الدكتور محمد البحراوى, ماجستير العلوم القضائية باحث دكتوراه فى القانون العام" />
        <meta name='keywords' content='زواج , طلاق, كتب كتاب , تصادق , رجعة , زواج اجانب , سفارة , وزارة العدل , قنصلية , الخارجية , العبور , الشروق , بدر , مدينتي , الرحاب , القاهرة' />
        <meta name='author' content='محمد البحراوي' />
      </Head>
      <TransitionEffect />
      <main className='flex items-center text-dark w-full min-h-screen flex-col'>
        <Layout classname='pt-0 md:pt-16 sm:pt-8'>
          <div className='flex items-center justify-between w-full lg:flex-col'>
            {/* image */}
          <div className='md:w-[60%] sm:w-[70%] xl:w-[30%] lg:w-[40%] 2xl:w-[30%] 3xl:w[30%] my-8 relative h-max rounded-2xl border-2 border-solid border-dark bg-light p-8 xl-col-span-4 md:order-1 md:col-span-8 '>
            <div className='absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark md:order-1'/>
              <Image src={almaazoon1} alt="ماذون شرعي" className="w-full h-auto rounded-2xl"
              priority
              sizes="(max-width:768px)100vw,
              (max-width:1200px) 50vw,
                33vw"
              />
            </div>
            {/* text */}
            <div className='w-1/2 flex flex-col items-center self-center lg:w-full lg:text-center'>
              
              <AnimatedText 
              text="المأذون الشرعى  "
              className='!text-6xl text-end xl:!text-5xl lg:!text-center mb-4 lg:!text-6xl  md:!text-5xl sm:!text-3xl text-red-700 '
              />
              <p className='my-4 text-2xl font-medium text-gray-600 text-end '>
              الدكتور محمد البحراوى, ماجستير العلوم القضائية باحث دكتوراه فى القانون العام 
              </p>
              <div className='flex items-center self-end mt-2 lg:self-center'>
                <Link href="/questions" 
                className='flex items-center bg-gray-500 duration-300 text-light p-2.5 px-6 rounded-lg text-lg font-semibold
                 hover:bg-red-700 hover:text-white hover:border-white  border-solid 
                border-transparent  border-2 mr-4'
                
                >
                  اسأل المأذون الشرعي
                  
                </Link>
                <Link href="/articles"  
                className='ml-4 text-lg font-medium capitalize text-dark underline' >
                  تصفح الفتاوي
                </Link>
              </div>

            </div>
            

          </div>

        </Layout>
          <div className='my-32 w-full '>
            <Image src={almaazoonBanner} alt='بانر المأذون'  />
          </div>
        <Layout>
        <div className="w-full h-96">
          <iframe
            className="w-full h-full"
            loading="lazy"
            allowFullScreen
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2898.6206277087886!2d31.467239189359496!3d30.235357627006547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDE0JzA3LjUiTiAzMcKwMjcnNTUuMCJF!5e0!3m2!1sar!2seg!4v1707098864657!5m2!1sar!2seg"
            title="Google Maps"
          ></iframe>
        </div>
        </Layout>
      </main>
    </>
  )
}
