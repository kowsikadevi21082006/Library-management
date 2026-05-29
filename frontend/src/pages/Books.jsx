import { useCallback, useEffect, useState } from "react";
import api, { getApiErrorMessage } from "../services/api";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [form, setForm] = useState({
    book_name: "",
    author: "",
    available_count: ""
  });

  const fetchBooks = useCallback(async () => {
    setErrorMessage("");

    try {
      const response = await api.get("/book");
      setBooks(response.data);
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "Unable to load books."));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    Promise.resolve().then(fetchBooks);
  }, [fetchBooks]);

  const validateForm = () => {
    if (!form.book_name.trim() || !form.author.trim() || form.available_count === "") {
      return "Please fill in book name, author, and available count.";
    }

    if (Number(form.available_count) < 0) {
      return "Available count cannot be negative.";
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
      await api.post("/book", {
        book_name: form.book_name.trim(),
        author: form.author.trim(),
        available_count: Number(form.available_count)
      });

      setForm({
        book_name: "",
        author: "",
        available_count: ""
      });

      setSuccessMessage("Book added successfully");
      await fetchBooks();
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "Unable to add book."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Books</h1>

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
          placeholder="Book Name"
          value={form.book_name}
          onChange={(e) => setForm({ ...form, book_name: e.target.value })}
          className="border p-3 rounded"
          required
        />

        <input
          type="text"
          placeholder="Author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          className="border p-3 rounded"
          required
        />

        <input
          type="number"
          placeholder="Available Count"
          value={form.available_count}
          onChange={(e) => setForm({ ...form, available_count: e.target.value })}
          className="border p-3 rounded"
          min="0"
          required
        />

        <button
          className="rounded bg-green-600 p-3 font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-300 sm:col-span-3"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding Book..." : "Add Book"}
        </button>
      </form>

      <div className="overflow-auto rounded bg-white shadow">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Book Name</th>
              <th className="p-4 text-left">Author</th>
              <th className="p-4 text-left">Available Count</th>
            </tr>
          </thead>

          <tbody>
            {isLoading && (
              <tr className="border-t">
                <td className="p-4 text-gray-500" colSpan="3">
                  Loading books...
                </td>
              </tr>
            )}

            {!isLoading && books.length === 0 && (
              <tr className="border-t">
                <td className="p-4 text-gray-500" colSpan="3">
                  No books available
                </td>
              </tr>
            )}

            {!isLoading && books.map((book) => (
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
