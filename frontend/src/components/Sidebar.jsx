import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Book,
  ClipboardList
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white fixed">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        Library Admin
      </div>

      <nav className="flex flex-col p-4 gap-4">
        <Link to="/" className="flex items-center gap-2 hover:text-blue-400">
          <LayoutDashboard size={20} /> Dashboard
        </Link>

        <Link to="/members" className="flex items-center gap-2 hover:text-blue-400">
          <Users size={20} /> Members
        </Link>

        <Link to="/books" className="flex items-center gap-2 hover:text-blue-400">
          <Book size={20} /> Books
        </Link>

        <Link to="/issuance" className="flex items-center gap-2 hover:text-blue-400">
          <ClipboardList size={20} /> Issuance
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;