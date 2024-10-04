import { useEffect, useState } from "react";
import axios from "axios";

export default function Slogan() {
  const [slogan, setSlogan] = useState("");

  useEffect(() => {
    const fetchSlogan = async () => {
      try {
        const { data } = await axios.get("/gemini-slogan");
        setSlogan(data.slogan);
      } catch (error) {
        console.error(error);
        setSlogan();
      }
    };

    fetchSlogan();
  }, []);

  return (
    <div>
      <h1>{slogan}</h1>
    </div>
  );
}
