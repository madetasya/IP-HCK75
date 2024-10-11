import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setLogin(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setLogin(false);
    navigate("/");
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to={login ? "/" : "/"}>Homepage</Link>
            </li>
            {login ? (
              <li>
                <button onClick={handleLogout} className="btn btn-error">
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a
          onClick={() => (login ? navigate("/") : navigate("/"))}
          className="btn btn-ghost text-xl"
        >
          DIMI
        </a>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle"></button>
      </div>
    </div>
  );
}
