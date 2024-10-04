import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apis } from "../axios";

export default function Edit() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]); 
  const [detailPost, setDetailPost] = useState({
    title: "",
    categoryId: 0,
    content: "",
    imgUrl: "",
  });


  const getCategories = async () => {
    try {
      let { data } = await apis.get("/apis/blog/categories", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  };


  const getDetailPost = async () => {
    if (id) {
      try {
        let { data } = await apis.get(`/apis/blog/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        setDetailPost(data); 
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apis.put(
        `/apis/blog/posts/${id}`,
        {
          ...detailPost,
          categoryId: Number(detailPost.categoryId),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      navigate("/admin"); 
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (event) => {
    setDetailPost({
      ...detailPost,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    getCategories();
    getDetailPost();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-md mt-10">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={detailPost.title}
            onChange={handleEdit}
            placeholder="Enter post title"
            className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="categoryId" className="block text-gray-700">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="categoryId"
            name="categoryId"
            value={detailPost.categoryId}
            onChange={handleEdit}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value={0} disabled>
              -- Select Category --
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700">
            Content <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="content"
            name="content"
            value={detailPost.content}
            onChange={handleEdit}
            placeholder="Enter post content"
            className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="imgUrl" className="block text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            id="imgUrl"
            name="imgUrl"
            value={detailPost.imgUrl}
            onChange={handleEdit}
            placeholder="Enter image URL"
            className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex space-x-4 mt-6">
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="w-1/2 py-2 bg-gray-200 text-gray-700 rounded-full text-center hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-1/2 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
