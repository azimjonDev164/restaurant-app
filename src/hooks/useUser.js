import { useEffect, useState } from "react";
import API from "../services/api";

export default function useUser() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // ✅ Get all users
  const getUsers = async () => {
    setLoading(true);
    try {
      const res = await API.get("/user");
      setData(res.data);
    } catch (error) {
      console.error("Error fetching dishes:", error);
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return { data, loading, err };
}
