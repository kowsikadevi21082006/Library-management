import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Book,
  ClipboardList
} from "lucide-react";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 rounded px-3 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-200 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <aside className="bg-gray-900 text-white lg:fixed lg:h-screen lg:w-64">
      <div className="border-b border-gray-700 p-5 text-xl font-bold">
        Library Admin
      </div>

      <nav className="grid gap-2 p-4 sm:grid-cols-4 lg:flex lg:flex-col">
        <NavLink to="/" className={linkClass}>
          <LayoutDashboard size={20} /> Dashboard
        </NavLink>

        <NavLink to="/members" className={linkClass}>
          <Users size={20} /> Members
        </NavLink>

        <NavLink to="/books" className={linkClass}>
          <Book size={20} /> Books
        </NavLink>

        <NavLink to="/issuance" className={linkClass}>
          <ClipboardList size={20} /> Issuance
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
