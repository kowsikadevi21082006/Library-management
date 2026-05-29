import { useCallback, useEffect, useState } from "react";
import api, { getApiErrorMessage } from "../services/api";
import DashboardCard from "../components/DashboardCard";

const Dashboard = () => {
  const [members, setMembers] = useState([]);
  const [books, setBooks] = useState([]);
  const [issuance, setIssuance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = useCallback(async () => {
    setErrorMessage("");

    try {
      const [memberRes, bookRes, issuanceRes] = await Promise.all([
        api.get("/member"),
        api.get("/book"),
        api.get("/issuance")
      ]);

      setMembers(memberRes.data);
      setBooks(bookRes.data);
      setIssuance(issuanceRes.data);
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "Unable to load dashboard data."));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    Promise.resolve().then(fetchData);

    const refreshOnFocus = () => fetchData();
    const intervalId = window.setInterval(fetchData, 30000);

    window.addEventListener("focus", refreshOnFocus);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener("focus", refreshOnFocus);
    };
  }, [fetchData]);

  const pendingReturns = issuance.filter(
    (item) => item.returned === false
  );

  return (
    <div>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">Live overview from the deployed backend.</p>
        </div>

        <button
          type="button"
          onClick={fetchData}
          className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
          disabled={isLoading}
        >
          {isLoading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {errorMessage && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Members" value={isLoading ? "..." : members.length} />
        <DashboardCard title="Total Books" value={isLoading ? "..." : books.length} />
        <DashboardCard title="Total Issuances" value={isLoading ? "..." : issuance.length} />
        <DashboardCard title="Pending Returns" value={isLoading ? "..." : pendingReturns.length} />
      </div>
    </div>
  );
};
export default Dashboard;
