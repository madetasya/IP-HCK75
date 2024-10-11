import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosIns } from "../axios";

export default function ArticleEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });
  const getArticle = async () => {
    try {
      const { data } = await axiosIns.get(`/article/${id}`);
      setFormData({
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosIns.put(`/article/${id}`, formData);
      navigate(`/${id}`)
    } catch (error) {
      console.log("Failed to update the article:", error);
    }
  };

  useEffect(() => {
    getArticle();
  }, [id]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-chamoisee mb-8">Edit Article</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="title" className="block text-buff text-lg mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-chamoisee"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-buff text-lg mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="5"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-chamoisee"
          ></textarea>
        </div>

        <div className="mb-6">
          <label htmlFor="imageUrl" className="block text-buff text-lg mb-2">
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-chamoisee"
          />
        </div>

        <button
          type="submit"
          className="bg-buff text-seashell py-2 px-6 rounded-lg shadow-md hover:bg-chamoisee transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
