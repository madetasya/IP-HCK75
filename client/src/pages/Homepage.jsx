import { useEffect, useState } from "react";
import Card from "../component/Card";
import { axiosIns } from "../axios";

export default function Homepage() {
  const [posts, setPosts] = useState([]);

  const getPost = async () => {
    try {
      const { data } = await axiosIns.get("/article");
      setPosts(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <div className="bg-seashell min-h-screen">
        <div className="container mx-auto py-10">
          <h1 className="text-4xl font-bold text-center text-chamoisee mb-10">
            Welcome to the Blog
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <Card key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
