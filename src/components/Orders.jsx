import { useUser } from "@clerk/clerk-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faUtensils,
  faCoffee,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

const orders = [
  {
    id: 1,
    table: 3,
    date: "2025-10-09 15:09:25",
    status: "In Progress",
    items: [
      { type: "food", name: "Classic Burger", quantity: 2 },
      { type: "drink", name: "Iced Coffee", quantity: 1 },
    ],
  },
  {
    id: 2,
    table: 6,
    date: "2025-10-09 14:30:00",
    status: "Completed",
    items: [
      { type: "food", name: "Grilled Steak", quantity: 1 },
      { type: "dessert", name: "Chocolate Cake", quantity: 1 },
    ],
  },
  {
    id: 3,
    table: 4,
    date: "2025-10-09 13:15:00",
    status: "Preparing",
    items: [{ type: "drink", name: "Orange Juice", quantity: 2 }],
  },
  // Add more sample orders as needed
];

function Orders() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800">
        <p className="text-3xl font-semibold text-white animate-pulse">
          Loading user...
        </p>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800">
        <p className="text-3xl font-semibold text-white">
          Please{" "}
          <a href="/sign-in" className="text-yellow-400 hover:underline">
            sign in
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full py-6 px-1 md:p-10">
      {/* Header Section */}
      <div className="border-b-2 border-dashed border-gray-700 pb-6 mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          Your Orders
        </h1>
        <p className="text-gray-300 mt-3 text-lg">
          Welcome, {user.firstName || "Guest"}! Track your recent orders below.
        </p>
      </div>

      {/* Activity Table with Drawer */}
      <div className="mt-8">
        <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
          <table className="table-auto w-full text-left text-white">
            <thead>
              <tr className="bg-gray-700/90 text-gray-200 uppercase text-xs tracking-wider">
                <th className="px-6 py-4 font-semibold">Table</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {orders.map((order, idx) => {
                const drawerId = `drawer-row-${idx}`;
                return (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-700/50 transition-colors duration-200"
                  >
                    <td colSpan={3} className="p-0">
                      <div className="drawer drawer-end w-full">
                        <input
                          id={drawerId}
                          type="checkbox"
                          className="drawer-toggle"
                        />
                        <div className="drawer-content">
                          <label
                            htmlFor={drawerId}
                            className="flex w-full items-center px-6 py-4 cursor-pointer"
                            aria-label={`Open details for order on table ${order.table}`}
                          >
                            <span className="w-1/3 font-medium text-gray-100">
                              Table {order.table}
                            </span>
                            <span className="w-1/3 text-gray-300">
                              {new Date(order.date).toLocaleString("en-US", {
                                dateStyle: "medium",
                                timeStyle: "short",
                              })}
                            </span>
                            <span className="w-1/3">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  order.status === "In Progress"
                                    ? "bg-yellow-500/20 text-yellow-400"
                                    : order.status === "Completed"
                                    ? "bg-green-500/20 text-green-400"
                                    : "bg-blue-500/20 text-blue-400"
                                }`}
                              >
                                {order.status}
                              </span>
                            </span>
                          </label>
                        </div>

                        {/* Drawer Side */}
                        <div className="drawer-side z-50">
                          <label
                            htmlFor={drawerId}
                            aria-label="Close sidebar"
                            className="drawer-overlay"
                          ></label>
                          <div className="bg-gray-900 min-h-full w-80 md:w-96 p-6 text-white space-y-6">
                            {/* Header */}
                            <div className="mb-6">
                              <h2 className="text-2xl font-bold text-white">
                                Order Details
                              </h2>
                              <p className="text-sm text-gray-400 mt-1">
                                Table {order.table} •{" "}
                                {new Date(order.date).toLocaleDateString()}
                              </p>
                            </div>

                            {/* Ordered Items */}
                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold text-gray-200">
                                Items Ordered
                              </h3>
                              {order.items.map((item, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-3 bg-gray-800/50 rounded-xl p-3 hover:bg-gray-800 transition"
                                >
                                  <FontAwesomeIcon
                                    icon={
                                      item.type === "food"
                                        ? faUtensils
                                        : item.type === "drink"
                                        ? faCoffee
                                        : faClipboardList
                                    }
                                    className="text-yellow-400 text-lg"
                                  />
                                  <div>
                                    <p className="font-medium text-gray-100">
                                      {item.name}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                      Quantity: {item.quantity}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Status */}
                            <div className="border-t border-gray-700 pt-4">
                              <div className="flex items-center gap-3">
                                <FontAwesomeIcon
                                  icon={faCheckCircle}
                                  className={`text-lg ${
                                    order.status === "In Progress"
                                      ? "text-yellow-400"
                                      : order.status === "Completed"
                                      ? "text-green-400"
                                      : "text-blue-400"
                                  }`}
                                />
                                <div>
                                  <p className="font-medium text-gray-100">
                                    Status
                                  </p>
                                  <p className="text-sm text-gray-400">
                                    {order.status}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Close Button */}
                            <button className="mt-6 w-[100px] mx-auto bg-gradient-to-r from-yellow-500 to-amber-600 py-3 rounded-full text-center font-semibold text-white hover:shadow-lg hover:scale-105 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-500">
                              <label
                                htmlFor={drawerId}
                                className="h-full w-full cursor-pointer"
                              >
                                close
                              </label>
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Orders;
