import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/transactions";

// Fetch all transactions
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (token) => {
    const res = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
);

// Add a transaction
export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async ({ transaction, token }) => {
    const res = await axios.post(API_URL, transaction, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
);

// Update a transaction
export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  async ({ id, transaction, token }) => {
    const res = await axios.put(`${API_URL}/${id}`, transaction, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
);

// Delete a transaction
export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async ({ id, token }) => {
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchTransactions
      .addCase(fetchTransactions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // addTransaction
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // updateTransaction
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const index = state.list.findIndex((t) => t._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      })

      // deleteTransaction
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.list = state.list.filter((t) => t._id !== action.payload);
      });
  },
});

export default transactionSlice.reducer;
