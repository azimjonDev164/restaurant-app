import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import API from "../services/api";

export default function useOrder() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [userData, setUserData] = useState(null);
  const { user } = useUser();

  // ✅ 1. Load user from your MongoDB by email
  const getUser = async () => {
    try {
      if (!user) return;
      const res = await API.post("/user/email", {
        email: user.primaryEmailAddress.emailAddress,
      });
      setUserData(res.data);
      return res.data;
    } catch (error) {
      console.error("❌ Error loading user:", error.message);
    }
  };

  // ✅ 2. Create order (connected to Mongo user)
  const createOrder = async (userId, items, reservationId) => {
    try {
      const res = await API.post("/order", {
        userId,
        items,
        reservationId,
      });
      console.log("✅ Order created:", res.data);
      return res.data;
    } catch (error) {
      console.error("❌ Error creating order:", error.message);
    }
  };

  // ✅ 3. Fetch orders by userId
  const getAllOrdersByUserId = async (userId) => {
    setLoading(true);
    try {
      const res = await API.get(`/order/${userId}`);
      return res.data;
    } catch (error) {
      console.error("❌ Error loading orders:", error.message);
      setErr(error.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getAllOrders = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/order`);
      return res.data;
    } catch (error) {
      console.error("❌ Error loading orders:", error.message);
      setErr(error.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/order/${id}`, { status });
    } catch (error) {
      console.error("❌ Error updating orders", error.message);
      setErr(error.message);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await API.delete(`/order/${id}`);
      console.log("deleted succesfully!");
    } catch (error) {
      console.error("❌ Error updating orders", error.message);
      setErr(error.message);
    }
  };

  //["PENDING", "PREPARING", "SERVED", "CANCELLED"],

  useEffect(() => {
    getUser();
  }, [user]);

  return {
    createOrder,
    getAllOrdersByUserId,
    updateStatus,
    deleteOrder,
    getAllOrders,
    loading,
    err,
    userData,
  };
}
