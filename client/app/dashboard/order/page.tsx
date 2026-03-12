export default function OrdersPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">Orders</h1>
        <span className="text-zinc-500 dark:text-zinc-400 text-sm mt-2 sm:mt-0">
          View and manage your recent orders
        </span>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6">
        <div className="mb-4">
          <h2 className="text-lg font-medium">Recent Orders</h2>
        </div>
        {/* Placeholder orders table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase">
                  Order #
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase">
                  Date
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase">
                  Total
                </th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <tr>
                <td className="px-4 py-2">1001</td>
                <td className="px-4 py-2">2024-06-01</td>
                <td className="px-4 py-2">
                  <span className="inline-block px-2 py-1 text-xs rounded bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                    Delivered
                  </span>
                </td>
                <td className="px-4 py-2">$59.99</td>
                <td className="px-4 py-2">
                  <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">1000</td>
                <td className="px-4 py-2">2024-05-24</td>
                <td className="px-4 py-2">
                  <span className="inline-block px-2 py-1 text-xs rounded bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
                    Processing
                  </span>
                </td>
                <td className="px-4 py-2">$34.50</td>
                <td className="px-4 py-2">
                  <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">0999</td>
                <td className="px-4 py-2">2024-05-13</td>
                <td className="px-4 py-2">
                  <span className="inline-block px-2 py-1 text-xs rounded bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
                    Cancelled
                  </span>
                </td>
                <td className="px-4 py-2">$120.00</td>
                <td className="px-4 py-2">
                  <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                    View
                  </button>
                </td>
              </tr>
              {/* More sample orders or placeholder for data */}
            </tbody>
          </table>
        </div>
        <div className="pt-4 text-zinc-400 text-xs">
          <em>Order data is for demonstration purposes.</em>
        </div>
      </div>
    </div>
  );
}
("use client");
import React, { useState } from "react";
import AddOrderModal from "../../_components/addOrderModal";

export default function OrderPage() {
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Example onSubmit handler (adjust as needed to manage order data)
  const handleAddOrder = (order: {
    orderId: string;
    date: string;
    status: string;
    total: string;
  }) => {
    // Add order logic here (e.g., update orders state or send to API)
    // For demonstration, we'll just log it
    console.log("Order added:", order);
  };

  return (
    <div>
      {/* Existing order table and content... */}
      {/* Insert the Add Order Button at the top */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setAddModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition"
        >
          Add Order
        </button>
      </div>

      {/* Place your existing table and content here, or wrap them as needed */}

      {/* AddOrderModal component */}
      <AddOrderModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddOrder}
      />
    </div>
  );
}
