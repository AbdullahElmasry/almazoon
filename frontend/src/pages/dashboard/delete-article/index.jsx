import { Project } from "@/pages/articles"
import Layout from "../Layout"
import { useEffect, useState } from "react";
import { axiosInstance } from "@/pages/admin";
import { useRouter } from "next/router";

const Index = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState();
  
  const router = useRouter()

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
    const fetchArticles = async () => {
      try {
        const response = await axiosInstance.get(`/api/articles/get-articles?page=${page}&limit=30`);
        setArticles(response.data.articles);
        setError('تم مسح المقال')
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
  
    fetchArticles();
  }, [page]); // Fetch articles when page changes
  
  const loadMoreArticles = () => {
    setPage(prevPage => prevPage + 1); // Increment page to load next page of articles
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/api/article/${id}/delete-article`,{
        withCredentials: true
      });
      setError('تم حذف المقال')
    } catch (error) {
      setError('فشل حذف المقال')
    }
  };

  return (
    <Layout>
        <div className="w-full flex flex-wrap">
        {articles.map(article => (
          <div className="flex justify-center bg-white shadow-md w-full lg:w-1/2 3xl:w-1/2 2xl:w-1/2 xl:w-1/2 mb-8" key={article._id}>
            <div className="flex justify-center items-center p-12 w-1/4 lg:w-1/12">
              <p
                onClick={async () => {
                  try {
                    // Make a DELETE request to the backend API to delete the article
                    await axiosInstance.delete(`/api/articles/${article._id}/delete-article`,{
                      withCredentials:true
                    });
                    console.log('Article deleted successfully');
                    // Optionally, you can trigger a refresh of the article list or update the UI as needed after deletion
                  } catch (error) {
                    console.error('Error deleting article:', error);
                    // Handle error appropriately, e.g., show error message to the user
                  }
                }}
                className="text-red-800 text-center w-full cursor-pointer"
              >
                مسح الفتوى
              </p>
            </div>
            <div className="p-8 w-full lg:w-11/12">
              <Project
                
                title={article.title}
                imageUrl={article.image}
                content={article.content}
                link={article._id}
              />
            </div>
            
          </div>
          
        ))}
      </div>
      <div className="w-full flex justify-center mt-8">
        <button onClick={loadMoreArticles} className="m-auto bg-gray-200 hover:bg-red-500 rounded transition duration-300 ease-in-out py-4 px-8">
          Load More
        </button>
      </div>

    </Layout>
  )
}

export default Index
