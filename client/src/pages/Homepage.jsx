import { useEffect, useState } from "react";
import Card from "../component/Card";
import { useNavigate } from "react-router-dom";
import { axiosIns } from "../axios";

export default function Homepage() {
  const [posts, setPosts] = useState([]);
  const [disasters, setDisasters] = useState([]);
  const navigate = useNavigate();

  const getPost = async () => {
    try {
      const { data } = await axiosIns.get("/article");
      console.log();
      
      setPosts(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="bg-[#263E40] min-h-screen">
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-bold text-center text-chamoisee mb-10">
          WELCOME
        </h1>

        <div className="flex justify-center mb-3">
          <button
            onClick={() => navigate("/create-article")}
            className="bg-buff text-seashell py-2 px-4 rounded-lg shadow-md hover:bg-chamoisee transition-colors"
          >
            Create New Article
          </button>
        </div>

        <div className="flex justify-center mb-10">
          <button
            onClick={() => navigate("/result")}
            className="bg-bone text-chamoisee py-2 px-4 rounded-lg shadow-md hover:bg-light-blue hover:text-seashell transition-colors"
          >
            Disaster This Week
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {posts.map((post) => (
            <Card key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
