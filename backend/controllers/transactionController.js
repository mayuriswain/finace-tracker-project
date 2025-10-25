import Transaction from "../models/Transaction.js";
import { parse } from "json2csv";
import csvParser from "csv-parser";

// GET all transactions for logged-in user
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id }).sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST add transaction
export const addTransaction = async (req, res) => {
  try {
    const { type, category, amount, description, date } = req.body;

    if (!type || !category || !amount || !description || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const transaction = await Transaction.create({
      type,
      category,
      amount,
      description,
      date,
      user: req.user._id,
    });

    res.status(201).json(transaction);
  } catch (err) {
    console.error("Error adding transaction:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT update transaction
export const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    res.status(200).json(transaction);
  } catch (err) {
    console.error("Error updating transaction:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE transaction
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    res.status(200).json({ message: "Transaction deleted" });
  } catch (err) {
    console.error("Error deleting transaction:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /import CSV for logged-in user
export const importTransactions = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const transactions = [];
    const buffer = req.file.buffer;

    buffer
      .toString()
      .split("\n")
      .slice(1)
      .forEach((line) => {
        const [date, description, category, amount, type] = line.split(",");
        if (date && description && category && amount && type) {
          transactions.push({
            date,
            description,
            category,
            amount,
            type,
            user: req.user._id,
          });
        }
      });

    const saved = await Transaction.insertMany(transactions);
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error importing transactions:", err);
    res.status(500).json({ message: "Import failed" });
  }
};

// GET /export CSV for logged-in user
export const exportTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id });
    const csv = parse(transactions, { fields: ["date", "description", "category", "amount", "type"] });

    res.header("Content-Type", "text/csv");
    res.attachment("transactions.csv");
    res.send(csv);
  } catch (err) {
    console.error("Error exporting transactions:", err);
    res.status(500).json({ message: "Export failed" });
  }
};
