import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "../features/transactions/transactionSlice";
import { useTheme } from "../context/ThemeContext";
import TransactionCharts from "./TransactionCharts";

const categoryColors = {
  Food: "table-danger",
  Transport: "table-primary",
  Entertainment: "table-warning",
  Salary: "table-success",
  Other: "table-secondary",
};

export default function Transaction() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.user?.token);
  const transactions = useSelector((state) => state.transactions?.list || []);
  const { darkMode } = useTheme();

  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: "",
    amount: "",
    type: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Filter & Search state
  const [searchText, setSearchText] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterMinAmount, setFilterMinAmount] = useState("");
  const [filterMaxAmount, setFilterMaxAmount] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc"); // "asc" or "desc"

  useEffect(() => {
    if (token) dispatch(fetchTransactions(token));
  }, [dispatch, token]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!token) return alert("User not authenticated");

    if (editingId) {
      dispatch(updateTransaction({ id: editingId, transaction: formData, token }));
      setEditingId(null);
    } else {
      dispatch(addTransaction({ transaction: formData, token }));
    }

    setFormData({ date: "", description: "", category: "", amount: "", type: "" });
  };

  const handleEdit = (t) => {
    setEditingId(t._id);
    setFormData({ ...t });
  };

  const handleDelete = (id) => {
    if (!token) return alert("User not authenticated");
    dispatch(deleteTransaction({ id, token }));
  };

  const exportCSV = () => {
    if (!transactions.length) return alert("No transactions to export!");
    const headers = ["Date", "Description", "Category", "Amount", "Type"];
    const rows = transactions.map((t) => [t.date, t.description, t.category, t.amount, t.type]);
    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Memoized filtered & sorted transactions
  const displayedTransactions = useMemo(() => {
    return transactions
      .filter((t) => {
        // Search
        if (searchText && !t.description.toLowerCase().includes(searchText.toLowerCase()))
          return false;

        // Filter category
        if (filterCategory && t.category !== filterCategory) return false;

        // Filter amount
        if (filterMinAmount && t.amount < Number(filterMinAmount)) return false;
        if (filterMaxAmount && t.amount > Number(filterMaxAmount)) return false;

        // Filter date range
        if (filterStartDate && t.date < filterStartDate) return false;
        if (filterEndDate && t.date > filterEndDate) return false;

        return true;
      })
      .sort((a, b) => {
        if (!sortField) return 0;
        let valA = a[sortField];
        let valB = b[sortField];

        // For numbers, convert
        if (sortField === "amount") {
          valA = Number(valA);
          valB = Number(valB);
        }

        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
  }, [
    transactions,
    searchText,
    filterCategory,
    filterMinAmount,
    filterMaxAmount,
    filterStartDate,
    filterEndDate,
    sortField,
    sortOrder,
  ]);

  return (
    <div className={`container mt-4 ${darkMode ? "text-light" : ""}`}>
      <h2 className="mb-3">Finance Transactions</h2>
      <p className="mb-4">
        Add, edit, delete, filter, search, sort or export your transactions easily.
      </p>

      {/* Horizontal Form */}
      <form
        onSubmit={handleSubmit}
        className={`mb-4 p-3 border rounded shadow-sm ${
          darkMode ? "bg-secondary text-light" : "bg-light"
        }`}
      >
        <div className="row g-2 align-items-center">
          <div className="col-md-2">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-2">
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div className="col-md-1">
            <button type="submit" className="btn btn-primary w-100">
              {editingId ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </form>

      {/* Filters & Search */}
      <div className="row mb-3 g-2">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search Description"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            className="form-control"
            placeholder="Filter Category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Min Amount"
            value={filterMinAmount}
            onChange={(e) => setFilterMinAmount(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Max Amount"
            value={filterMaxAmount}
            onChange={(e) => setFilterMaxAmount(e.target.value)}
          />
        </div>
        <div className="col-md-3 d-flex gap-2">
          <input
            type="date"
            className="form-control"
            placeholder="Start Date"
            value={filterStartDate}
            onChange={(e) => setFilterStartDate(e.target.value)}
          />
          <input
            type="date"
            className="form-control"
            placeholder="End Date"
            value={filterEndDate}
            onChange={(e) => setFilterEndDate(e.target.value)}
          />
        </div>
      </div>

      {/* Sort */}
      <div className="row mb-3 g-2">
        <div className="col-md-3">
          <select
            className="form-select"
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
            <option value="category">Sort by Category</option>
          </select>
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      {/* Export CSV Button */}
      <div className="mb-3">
        <button className="btn btn-success" onClick={exportCSV}>
          Export CSV
        </button>
      </div>

      {/* Transaction Table */}
      <div
        className={`table-responsive shadow-sm rounded ${
          darkMode ? "bg-dark text-light" : "bg-light"
        }`}
      >
        <table className="table table-striped table-bordered align-middle">
          <thead className={darkMode ? "table-secondary" : "table-dark"}>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedTransactions.map((t) => (
              <tr key={t._id} className={categoryColors[t.category] || ""}>
                <td>{t.date}</td>
                <td>{t.description}</td>
                <td>{t.category}</td>
                <td>{t.amount}</td>
                <td>{t.type}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(t)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(t._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {displayedTransactions.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <TransactionCharts />
      </div>
    </div>
  );
}
