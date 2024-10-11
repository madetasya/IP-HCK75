import { useEffect } from "react";
import Card from "../component/Card";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/postSlice";

export default function Homepage() {
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts()); // Correctly invoke the fetchPosts action
  }, [dispatch]);

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
            Disaster Mitigation
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {data?.data?.map((post) => (
            <Card key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
