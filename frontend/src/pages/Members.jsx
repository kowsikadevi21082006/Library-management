import { useEffect, useState } from "react";
import api from "../services/api";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const response = await api.get("/member");
    setMembers(response.data);
  };

   const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/member", form);

    setForm({
      name: "",
      email: "",
      phone: ""
    });

    fetchMembers();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Members</h1>

       <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow mb-6 grid gap-4"
      >
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-3 rounded"
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-3 rounded"
        />

         <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="border p-3 rounded"
        />

        <button className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700">
          Add Member
        </button>
      </form>

      <div className="bg-white rounded-xl shadow overflow-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
             </tr>
          </thead>

          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="border-t">
                <td className="p-4">{member.name}</td>
                <td className="p-4">{member.email}</td>
                <td className="p-4">{member.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Members;