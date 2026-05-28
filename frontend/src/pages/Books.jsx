import { useEffect, useState } from "react";
import api from "../services/api";

const Books = () => {
  const [books, setBooks] = useState([]);

  const [form, setForm] = useState({
    book_name: "",
    author: "",
    available_count: ""
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await api.get("/book");
    setBooks(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/book", {
      ...form,
      available_count: Number(form.available_count)
    });

    setForm({
      book_name: "",
      author: "",
      available_count: ""
    });

    fetchBooks();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Books</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow mb-6 grid gap-4"
      >
        <input
          type="text"
          placeholder="Book Name"
          value={form.book_name}
          onChange={(e) => setForm({ ...form, book_name: e.target.value })}
          className="border p-3 rounded"
        />

        <input
          type="text"
          placeholder="Author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          className="border p-3 rounded"
        />

         <input
          type="number"
          placeholder="Available Count"
          value={form.available_count}
          onChange={(e) => setForm({ ...form, available_count: e.target.value })}
          className="border p-3 rounded"
        />

        <button className="bg-green-600 text-white p-3 rounded hover:bg-green-700">
          Add Book
        </button>
      </form>

      <div className="bg-white rounded-xl shadow overflow-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Book Name</th>
              <th className="p-4 text-left">Author</th>
              <th className="p-4 text-left">Available Count</th>
            </tr>
            </thead>

          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="border-t">
                <td className="p-4">{book.book_name}</td>
                <td className="p-4">{book.author}</td>
                <td className="p-4">{book.available_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Books;