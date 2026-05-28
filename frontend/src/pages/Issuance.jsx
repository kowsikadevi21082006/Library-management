import { useEffect, useState } from "react";
import api from "../services/api";

const Issuance = () => {
  const [issuance, setIssuance] = useState([]);
  const [members, setMembers] = useState([]);
  const [books, setBooks] = useState([]);

  const [form, setForm] = useState({
    member_id: "",
    book_id: "",
    issued_date: "",
    target_return_date: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const issuanceRes = await api.get("/issuance");
      const memberRes = await api.get("/member");
      const bookRes = await api.get("/book");

      setIssuance(issuanceRes.data);
      setMembers(memberRes.data);
      setBooks(bookRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const markReturned = async (id) => {
    try {
      await api.put(`/issuance/${id}`, {
        returned: true
      });

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Book Issuance
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
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

        <button className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 md:col-span-2">
          Issue Book
        </button>
      </form>

      <div className="bg-white rounded-xl shadow overflow-auto">
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
            {issuance.map((item) => (
              <tr
                key={item.id}
                className="border-t"
              >
                <td className="p-4">
                  {item.member?.name}
                </td>

                <td className="p-4">
                  {item.book?.book_name}
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
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Mark Returned
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