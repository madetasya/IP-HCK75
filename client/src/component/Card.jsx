import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

export default function Card({ post }) {
  const navigate = useNavigate();

  // Function to handle card click and navigate to article details
  const handleCardClick = () => {
    navigate(`/article/${post.id}`);
  };

  return (
    <div
      className="bg-seashell rounded-lg shadow-lg overflow-hidden cursor-pointer"
      onClick={handleCardClick}
    >
      <figure>
        <img
          src={post.imageUrl || "/path/to/default-image.jpg"}
          onError={(e) => {
            e.target.src = "/path/to/default-image.jpg";
          }}
          alt={post.title}
          className="w-full h-64 object-cover"
        />
      </figure>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-chamoisee">{post.title}</h2>
        <Link
          to={`/${post.id}`}
          className="text-light-blue hover:underline hover:text-dark-green transition-colors duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

Card.propTypes = {
  post: PropTypes.exact({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
};
