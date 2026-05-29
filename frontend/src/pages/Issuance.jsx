import { useCallback, useEffect, useState } from "react";
import api, { getApiErrorMessage } from "../services/api";

const Issuance = () => {
  const [issuance, setIssuance] = useState([]);
  const [members, setMembers] = useState([]);
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [form, setForm] = useState({
    member_id: "",
    book_id: "",
    issued_date: "",
    target_return_date: ""
  });

  const fetchData = useCallback(async () => {
    setErrorMessage("");

    try {
      const [issuanceRes, memberRes, bookRes] = await Promise.all([
        api.get("/issuance"),
        api.get("/member"),
        api.get("/book")
      ]);

      setIssuance(issuanceRes.data);
      setMembers(memberRes.data);
      setBooks(bookRes.data);
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "Unable to load issuance records."));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    Promise.resolve().then(fetchData);
  }, [fetchData]);

  const validateForm = () => {
    if (!form.member_id || !form.book_id || !form.issued_date || !form.target_return_date) {
      return "Please select member, book, issued date, and return date.";
    }

    if (new Date(form.target_return_date) < new Date(form.issued_date)) {
      return "Return date cannot be before issued date.";
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
      await api.post("/issuance", {
        member_id: Number(form.member_id),
        book_id: Number(form.book_id),
        issued_date: form.issued_date,
        target_return_date: form.target_return_date
      });

      setForm({
        member_id: "",
        book_id: "",
        issued_date: "",
        target_return_date: ""
      });

      setSuccessMessage("Issuance created successfully");
      await fetchData();
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "Unable to create issuance."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const markReturned = async (id) => {
    setSuccessMessage("");
    setErrorMessage("");
    setUpdatingId(id);

    try {
      await api.put(`/issuance/${id}`, {
        returned: true
      });

      setSuccessMessage("Return status updated successfully");
      await fetchData();
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "Unable to update return status."));
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-900">
        Book Issuance
      </h1>

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
        className="mb-8 grid grid-cols-1 gap-4 rounded bg-white p-6 shadow md:grid-cols-2"
      >
        <select
          value={form.member_id}
          onChange={(e) =>
            setForm({
              ...form,
              member_id: e.target.value
            })
          }
          className="border p-3 rounded-lg"
          required
        >
          <option value="">Select Member</option>

          {members.length === 0 && (
            <option value="" disabled>No members available</option>
          )}

          {members.map((member) => (
            <option
              key={member.id}
              value={member.id}
            >
              {member.name}
            </option>
          ))}
        </select>

        <select
          value={form.book_id}
          onChange={(e) =>
            setForm({
              ...form,
              book_id: e.target.value
            })
          }
          className="border p-3 rounded-lg"
          required
        >
          <option value="">Select Book</option>

          {books.length === 0 && (
            <option value="" disabled>No books available</option>
          )}

          {books.map((book) => (
            <option
              key={book.id}
              value={book.id}
            >
              {book.book_name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={form.issued_date}
          onChange={(e) =>
            setForm({
              ...form,
              issued_date: e.target.value
            })
          }
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="date"
          value={form.target_return_date}
          onChange={(e) =>
            setForm({
              ...form,
              target_return_date: e.target.value
            })
          }
          className="border p-3 rounded-lg"
          required
        />

        <button
          className="rounded bg-purple-600 p-3 font-medium text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-purple-300 md:col-span-2"
          disabled={isSubmitting || members.length === 0 || books.length === 0}
        >
          {isSubmitting ? "Creating Issuance..." : "Issue Book"}
        </button>
      </form>

      <div className="overflow-auto rounded bg-white shadow">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Member</th>
              <th className="p-4 text-left">Book</th>
              <th className="p-4 text-left">Issued Date</th>
              <th className="p-4 text-left">Return Date</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {isLoading && (
              <tr className="border-t">
                <td className="p-4 text-gray-500" colSpan="6">
                  Loading issuance records...
                </td>
              </tr>
            )}

            {!isLoading && issuance.length === 0 && (
              <tr className="border-t">
                <td className="p-4 text-gray-500" colSpan="6">
                  No issuance records available
                </td>
              </tr>
            )}

            {!isLoading && issuance.map((item) => (
              <tr
                key={item.id}
                className="border-t"
              >
                <td className="p-4">
                  {item.member?.name || "Unknown member"}
                </td>

                <td className="p-4">
                  {item.book?.book_name || "Unknown book"}
                </td>

                <td className="p-4">
                  {new Date(
                    item.issued_date
                  ).toLocaleDateString()}
                </td>

                <td className="p-4">
                  {new Date(
                    item.target_return_date
                  ).toLocaleDateString()}
                </td>

                <td className="p-4">
                  {item.returned ? (
                    <span className="text-green-600 font-semibold">
                      Returned
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold">
                      Pending
                    </span>
                  )}
                </td>

                <td className="p-4">
                  {!item.returned && (
                    <button
                      onClick={() =>
                        markReturned(item.id)
                      }
                      className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                      disabled={updatingId === item.id}
                    >
                      {updatingId === item.id ? "Updating..." : "Mark Returned"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Issuance;
