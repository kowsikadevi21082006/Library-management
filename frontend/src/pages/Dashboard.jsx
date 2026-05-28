import { useEffect, useState } from "react";
import api from "../services/api";
import DashboardCard from "../components/DashboardCard";

const Dashboard = () => {
  const [members, setMembers] = useState([]);
  const [books, setBooks] = useState([]);
  const [issuance, setIssuance] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const memberRes = await api.get("/member");
    const bookRes = await api.get("/book");
    const issuanceRes = await api.get("/issuance");

    setMembers(memberRes.data);
    setBooks(bookRes.data);
    setIssuance(issuanceRes.data);
  };

  const pendingReturns = issuance.filter(
    (item) => item.returned === false
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Members" value={members.length} />
        <DashboardCard title="Total Books" value={books.length} />
        <DashboardCard title="Books Issued" value={issuance.length} />
        <DashboardCard title="Pending Returns" value={pendingReturns.length} />
      </div>
    </div>
  );
};
export default Dashboard;