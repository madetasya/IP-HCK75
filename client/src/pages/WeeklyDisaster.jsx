import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosIns } from "../axios";

export default function WeeklyDisaster() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const getPost = async () => {
    try {
      const { data } = await axiosIns.post("/gemini", {
        data: {
          location: "IDN",
        },
      });

      console.log(data);

      if (data && Array.isArray(data.insights)) {
        setPosts(data.insights);
      } else {
        console.log("No insights found");
        setPosts([]);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
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
            Disaster Mitigation
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div
                key={index}
                className="bg-[#e4d9c7ff] flex flex-col sm:flex-row items-center justify-between rounded-lg shadow-lg overflow-hidden cursor-pointer w-full h-64 border-2 border-[#e4d9c7ff]"
              >
                <div className="p-6 sm:w-1/2 h-full flex flex-col justify-between">
                  <h2 className="text-3xl font-bold text-[#263E40]">
                    {post.title}
                  </h2>
                  <p className="text-xl text-gray-600">{post.date}</p>
                  <p className="text-gray-500">{post.time}</p>

                  <div className="mt-4">
                    <p className="text-sm text-gray-500">Type:</p>
                    <p className="text-sm font-bold text-gray-900">
                      {post.type}
                    </p>
                  </div>
                  <p>{post.description}</p>
                </div>

                <figure className="sm:w-1/2 h-full relative pr-[80px] pt-[10px] pb-[10px]">
                  <img
                    alt={post.title}
                    className="w-full h-full object-cover saturate-50"
                  />
                </figure>
              </div>
            ))
          ) : (
            <p className="text-center text-white">
              No disasters found for this week.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
