"use client";

import React, { useState } from "react";
import axios from "axios";

interface AddOrderModalProps {
  // open: boolean;
  onClose: () => void;
  //   onSubmit: (order: {
  //     orderId: string;
  //     date: string;
  //     status: string;
  //     total: string;
  //   }) => void;
}

export default function AddOrderModal({ onClose }: AddOrderModalProps) {
  const [orderId, setOrderId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Processing");
  const [total, setTotal] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:3000/api/orders/create", {
      orderId,
      date,
      status,
      total,
    });
    console.log(res);
    console.log("x clicked");

    setOrderId(" ");
    setDate(" ");
    setStatus("Processing");
    setTotal(" ");
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/80 bg-opacity-40">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Add Order</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="orderId">
              Order ID
            </label>
            <input
              id="orderId"
              type="text"
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-zinc-50 dark:bg-zinc-800"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="date">
              Date
            </label>
            <input
              id="date"
              type="date"
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-zinc-50 dark:bg-zinc-800"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded bg-zinc-50 dark:bg-zinc-800 focus:outline-none"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="Processing">Processing</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="total">
              Total ($)
            </label>
            <input
              id="total"
              type="number"
              min={0}
              step="0.01"
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-zinc-50 dark:bg-zinc-800"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 transition font-semibold"
            >
              Add Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
