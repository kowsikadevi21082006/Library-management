import { useCallback, useEffect, useState } from "react";
import api, { getApiErrorMessage } from "../services/api";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const fetchMembers = useCallback(async () => {
    setErrorMessage("");

    try {
      const response = await api.get("/member");
      setMembers(response.data);
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "Unable to load members."));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    Promise.resolve().then(fetchMembers);
  }, [fetchMembers]);

  const validateForm = () => {
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      return "Please fill in name, email, and phone.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      return "Please enter a valid email address.";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const validationMessage = validateForm();

    if (validationMessage) {
      setErrorMessage(validationMessage);
      return;
    }

    setIsSubmitting(true);

    try {
      await api.post("/member", {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim()
      });

      setForm({
        name: "",
        email: "",
        phone: ""
      });

      setSuccessMessage("Member added successfully");
      await fetchMembers();
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "Unable to add member."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Members</h1>

      {successMessage && (
        <div className="mb-4 rounded border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mb-6 grid gap-4 rounded bg-white p-6 shadow sm:grid-cols-3"
      >
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-3 rounded"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-3 rounded"
          required
        />

        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="border p-3 rounded"
          required
        />

        <button
          className="rounded bg-blue-600 p-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300 sm:col-span-3"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding Member..." : "Add Member"}
        </button>
      </form>

      <div className="overflow-auto rounded bg-white shadow">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
             </tr>
          </thead>

          <tbody>
            {isLoading && (
              <tr className="border-t">
                <td className="p-4 text-gray-500" colSpan="3">
                  Loading members...
                </td>
              </tr>
            )}

            {!isLoading && members.length === 0 && (
              <tr className="border-t">
                <td className="p-4 text-gray-500" colSpan="3">
                  No members available
                </td>
              </tr>
            )}

            {!isLoading && members.map((member) => (
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
