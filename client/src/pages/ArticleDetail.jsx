import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosIns } from "../axios";

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const navigate = useNavigate();

  const getArticle = async () => {
    try {
      const { data } = await axiosIns.get(`/article/${id}`);
      setArticle(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosIns.delete(`/article/${id}`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArticle();
  }, [id]);

  if (!article) {
    return <div>Loading</div>;
  }

  return (
    <div className="container mx-auto py-10 flex flex-col lg:flex-row items-start">
      <div className="lg:w-1/2">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-auto object-cover rounded-lg shadow-lg"
        />
      </div>

      <div className="lg:w-1/2 lg:pl-10 mt-6 lg:mt-0">
        <h1 className="text-4xl font-bold text-[#263E40] mb-4">
          {article.title}
        </h1>
        <p className="text-lg text-chamoisee leading-relaxed">
          {article.description}
        </p>

        <div className="mt-6 flex space-x-4">
          <button
            onClick={() => navigate(`/${id}/edit`)}
            className="bg-buff text-seashell py-2 px-4 rounded-lg shadow-md hover:bg-chamoisee transition-colors"
          >
            Update
          </button>

          <button
            onClick={() => handleDelete(id)}
            className="bg-light-blue text-seashell py-2 px-4 rounded-lg shadow-md hover:bg-dark-green transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
