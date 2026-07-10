import { NavLink } from "react-router-dom";

const Navbar = () => {
  const linkStyles = ({ isActive }) => isActive 
    ? "text-blue-600 font-semibold"
    : "text-gray-700 hover:text-blue-600 transition-colors";


  return (
    <header className="stickp top-0 z-50 bg-white shadow">
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        <NavLink
          to={'/'}
          className="text-2xl font-bold text-blue-600"
        >
          Blog App
        </NavLink>

        <ul className="flex items-center gap-6">
          <li>
            <NavLink
              to={'/'}
              className={linkStyles}
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to={'/blogs'}
              className={linkStyles}
            >
              Blogs
            </NavLink>
          </li>

          <li>
            <NavLink
              to={'/about'}
              className={linkStyles}
            >
              About
            </NavLink>
          </li>

          <li>
            <NavLink
              to={'/contact'}
              className={linkStyles}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
};

export default Navbar;