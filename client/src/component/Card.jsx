import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

export default function Card({ post }) {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/${post.id}`);
  };

  return (
    <div
      className="bg-[#e4d9c7ff] flex flex-col sm:flex-row items-center justify-between rounded-lg shadow-lg overflow-hidden cursor-pointer w-full h-64 border-2 border-[#e4d9c7ff]"
      onClick={handleCardClick}
    >
      <div className="p-6 sm:w-1/2 h-full flex flex-col justify-between">
        <h2 className="text-5xl font-bold text-[#263E40]">{post.title}</h2>
        <p className="text-xl text-gray-600">{post.date}</p>
        <p className="text-gray-500">{post.time}</p>

        <div className="mt-4">
          <p className="text-sm text-gray-500">Type:</p>
          <p className="text-sm font-bold text-gray-900">Natural Disaster {post.location}</p>
        </div>

        <Link
          to={`/${post.id}`}
          className="text-chamoisee hover:underline font-bold text-xl hover:text-dark-green transition-colors duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          Read More
        </Link>
      </div>

      <figure className=" saturate-50 sm:w-1/2 h-full relative pr-[80px] pt-[10px] pb-[10px]">
        <img
          src={post.imageUrl || "/path/to/default-image.jpg"}
          onError={(e) => {
            e.target.src = "/path/to/default-image.jpg";
          }}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </figure>
    </div>
  );
}

Card.propTypes = {
  post: PropTypes.exact({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    price: PropTypes.string,
    location: PropTypes.string,
  }).isRequired,
};
