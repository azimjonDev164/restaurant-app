import API from "../services/api";

export default function useOrderItem() {
  const updateOrderItem = async (id, quantity) => {
    try {
      const res = await API.put(`/orderItem/${id}`, { quantity });
      return res.data;
    } catch (error) {
      console.error("Error updating table:", error);
      setErr(error.message);
    }
  };

  // ✅ Delete dish
  const deleteOrderItem = async (id) => {
    try {
      await API.delete(`/orderItem/${id}`);
    } catch (error) {
      console.error("Error deleting dish:", error);
      setErr(error.message);
    }
  };

  return { deleteOrderItem, updateOrderItem };
}
