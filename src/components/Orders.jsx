import { useUser } from "@clerk/clerk-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faCheckCircle,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import useOrder from "../hooks/useOrder";
import { useEffect, useState } from "react";
import useOrderItem from "../hooks/useOrderItem";

function Orders() {
  const { deleteOrderItem, updateOrderItem } = useOrderItem();
  const { isSignedIn, user, isLoaded } = useUser();
  const {
    getAllOrdersByUserId,
    getAllOrders,
    userData,
    deleteOrder,
    updateStatus,
    loading,
    err,
  } = useOrder();
  const [orders, setOrders] = useState([]);
  const [del, setDet] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editOrder, setEditOrder] = useState("PENDING");
  const PORT = import.meta.env.VITE_PORT;
  const [edit, setEdit] = useState({
    isShow: false,
    itemId: null,
    quantity: "",
  });

  const menu = ["PENDING", "PREPARING", "SERVED", "CANCELLED"];

  // ✅ Proper useEffect call
  useEffect(() => {
    if (!userData?._id) return;

    const fetchOrders = async () => {
      try {
        if (userData.role === "ADMIN") {
          const res = await getAllOrders();
          setOrders(res);
        } else {
          const res = await getAllOrdersByUserId(userData._id);
          setOrders(res);
        }
      } catch (err) {
        console.error("❌ Error loading orders:", err.message);
      }
    };

    fetchOrders();
  }, [userData, edit?.quantity, del]); // <-- re-run when userData changes
  // ✅ Conditional rendering after hooks

  // 🗑 Delete dish
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order item?")) {
      deleteOrderItem(id);
      setDet(id);
    }
  };

  const handleDeleteOrder = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      deleteOrder(id);
      setDet(id);
    }
  };

  // 🧠 Update the handleEdit function
  const handleEdit = async (id) => {
    try {
      const res = await updateOrderItem(id, edit.quantity);
      console.log(res.data);

      // reset edit state after saving
      setEdit({ isShow: false, itemId: null, quantity: "" });
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await updateStatus(editingId, editOrder);
      }
      setEditOrder("PENDING");
      setShowModal(false);
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleEditOrder = (item) => {
    setEditOrder(item.status);
    setEditingId(item._id);
    setShowModal(true);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800">
        <p className="text-3xl font-semibold text-white animate-pulse">
          Loading your orders...
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
    <>
      <div className="min-h-screen w-full py-6 px-1 md:p-10">
        <div className="border-b-2 border-dashed border-gray-700 pb-6 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Your Orders
          </h1>
          <p className="text-gray-300 mt-3 text-lg">
            Welcome, {user?.firstName || "Guest"}! Track your recent orders
            below.
          </p>
        </div>

        {/* 🧾 Orders Table */}
        <div className="mt-8">
          <div className="bg-gray-800 rounded-2xl shadow-xl">
            <table className="table-auto w-full text-left text-white">
              <thead>
                <tr className="bg-gray-700/90 text-gray-200 uppercase text-xs tracking-wider">
                  <th className="px-6 py-4 font-semibold">User</th>
                  <th className="px-6 py-4 font-semibold">Table</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-400">
                      Loading orders...
                    </td>
                  </tr>
                ) : err ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-red-400">
                      {err}
                    </td>
                  </tr>
                ) : (
                  orders.map((order, idx) => {
                    const drawerId = `drawer-row-${idx}`;
                    return (
                      <tr
                        key={order._id}
                        className="hover:bg-gray-700/50 transition-colors duration-200"
                      >
                        <td colSpan={5} className="p-0">
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
                              >
                                <span className="w-1/5 font-medium text-gray-100 text-sm md:text-md">
                                  {order?.user?.name || "unknown"}
                                </span>

                                <span className=" w-1/5 font-medium text-gray-100 text-sm md:text-md">
                                  Table{" "}
                                  {order?.reservation?.table?.number || "N/A"}
                                </span>
                                <span className="w-1/5 text-gray-300 text-sm md:text-md">
                                  {new Date(order.createdAt).toLocaleString(
                                    "en-US",
                                    {
                                      dateStyle: "medium",
                                      timeStyle: "short",
                                    }
                                  )}
                                </span>
                                <span className="w-1/5">
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                      order.status === "In Progress"
                                        ? "bg-yellow-500/20 text-yellow-400"
                                        : order.status === "Completed"
                                        ? "bg-green-500/20 text-green-400"
                                        : "bg-blue-500/20 text-blue-400"
                                    }`}
                                  >
                                    {order?.status}
                                  </span>
                                </span>
                                <span className="w-1/5 flex justify-center gap-3 items-center">
                                  <button
                                    onClick={() => handleDeleteOrder(order._id)}
                                    className="text-red-400 hover:text-red-500 cursor-pointer"
                                  >
                                    <FontAwesomeIcon icon={faTrash} />
                                  </button>
                                  {userData?.role === "ADMIN" && (
                                    <button
                                      onClick={() => handleEditOrder(order)}
                                      className="text-green-400 hover:text-green-500 cursor-pointer"
                                    >
                                      <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                  )}
                                </span>
                              </label>
                            </div>

                            {/* Drawer Side */}
                            <div className="drawer-side z-50">
                              <label
                                htmlFor={drawerId}
                                className="drawer-overlay"
                              ></label>
                              <div className="bg-gray-900 min-h-full w-80 md:w-96 p-6 text-white space-y-6">
                                <h2 className="text-2xl font-bold">
                                  Order Details
                                </h2>
                                <p className="text-sm text-gray-400">
                                  Table{" "}
                                  {order?.reservation?.table?.number || "N/A"} •{" "}
                                  {new Date(
                                    order?.reservation?.startTime
                                  ).toLocaleString("en-US", {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                  })}{" "}
                                  -{" "}
                                  {new Date(
                                    order?.reservation?.endTime
                                  ).toLocaleString("en-US", {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                  })}
                                </p>

                                {/* Items */}
                                <div className="space-y-4">
                                  <h3 className="text-lg font-semibold text-gray-200">
                                    Items Ordered
                                  </h3>
                                  {order.items.map((item, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center gap-3 bg-gray-800/50 rounded-xl p-3 hover:bg-gray-800 transition"
                                    >
                                      <img
                                        className="w-[60px] h-[60px] rounded-2xl object-cover"
                                        src={
                                          item?.dish?.image?.startsWith("http")
                                            ? item?.dish?.image
                                            : `${PORT}${item?.dish?.image}`
                                        }
                                        alt={item.name}
                                      />
                                      <div className="flex-1">
                                        <p className="font-medium text-gray-100">
                                          {item.name}
                                        </p>
                                        <p className="text-sm text-gray-400">
                                          Quantity:{" "}
                                          {edit.isShow &&
                                          edit.itemId === item._id ? (
                                            <form
                                              key={item._id}
                                              onSubmit={(e) => {
                                                e.preventDefault();
                                                handleEdit(item._id);
                                              }}
                                            >
                                              <input
                                                type="number"
                                                value={edit.quantity}
                                                onChange={(e) =>
                                                  setEdit({
                                                    ...edit,
                                                    quantity: e.target.value,
                                                  })
                                                }
                                                placeholder="quantity"
                                                className="bg-gray-700 text-white rounded-md px-2 py-1 w-20"
                                              />
                                              <button
                                                type="submit"
                                                className="ml-2 text-green-400 hover:text-green-500"
                                              >
                                                <FontAwesomeIcon
                                                  icon={faCheckCircle}
                                                />
                                              </button>
                                            </form>
                                          ) : (
                                            <>
                                              {item.quantity}
                                              <button
                                                onClick={() =>
                                                  setEdit({
                                                    isShow: true,
                                                    itemId: item._id,
                                                    quantity: item.quantity,
                                                  })
                                                }
                                                className="ml-2 text-green-400 hover:text-green-500 cursor-pointer"
                                              >
                                                <FontAwesomeIcon
                                                  icon={faEdit}
                                                />
                                              </button>
                                            </>
                                          )}{" "}
                                          <br />
                                          Price: $
                                          {item.quantity * item?.dish?.price}
                                        </p>
                                      </div>
                                      <div className="flex gap-1 justify-end">
                                        <button
                                          onClick={() => handleDelete(item._id)}
                                          className="text-red-400 hover:text-red-500 cursor-pointer"
                                        >
                                          <FontAwesomeIcon icon={faTrash} />
                                        </button>
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

                                <button className="mt-6 w-[100px] mx-auto bg-gradient-to-r from-yellow-500 to-amber-600 py-3 rounded-full text-center font-semibold text-white hover:shadow-lg hover:scale-105 transition-all">
                                  <label
                                    htmlFor={drawerId}
                                    className="h-full w-full cursor-pointer"
                                  >
                                    Close
                                  </label>
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-6 rounded-2xl w-[90%] sm:w-[400px] relative shadow-2xl animate-scaleIn">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>

            <label className="block mb-2 text-sm">Status</label>
            <select
              className="w-full text-white mb-3 bg-gray-700 p-2 rounded"
              name="menu"
              value={editOrder.status}
              onChange={(e) => setEditOrder(e.target.value)}
            >
              <option value="">Select Menu</option>
              {menu.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {/* SAVE BUTTON */}
            <button
              onClick={handleSave}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-lg mt-3 transition-all duration-200 cursor-pointer"
            >
              {editingId ? "Update category" : "Save"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Orders;
