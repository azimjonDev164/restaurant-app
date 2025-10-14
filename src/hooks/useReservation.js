import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import API from "../services/api";

export default function useReservation() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [userData, setUser] = useState({});
  const { user } = useUser();

  // ✅ Get user info from backend using Clerk email
  const getUser = async () => {
    try {
      if (user) {
        const res = await API.post("/user/email", {
          email: user?.primaryEmailAddress?.emailAddress,
        });
        setUser(res.data);
      }
    } catch (error) {
      console.error("❌ Error loading user:", error.message);
    }
  };

  // ✅ Create new reservation
  const createReservation = async (userId, tableId, startTime, endTime) => {
    try {
      const res = await API.post("/reservation", {
        userId,
        tableId,
        startTime,
        endTime,
      });
      console.log("✅ Reservation created:", res.data);
      return res.data;
    } catch (error) {
      console.error("❌ Error creating reservation:", error.message);
    }
  };

  // ✅ Fetch all reservations for a specific table
  const getAllReservations = async (tableId) => {
    setLoading(true);
    try {
      const res = await API.get(`/reservation/table/${tableId}`);
      return res.data;
    } catch (error) {
      console.error("❌ Error loading reservations:", error.message);
      setErr(error.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return { createReservation, getAllReservations, loading, err, userData };
}
