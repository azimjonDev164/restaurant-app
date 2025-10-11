import { useEffect, useState } from "react";
import API from "../services/api";

export default function useTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const getTables = async () => {
    setLoading(true);
    try {
      const res = await API.get("/table");
      setData(res.data);
    } catch (error) {
      console.error("Error getting all tables:", error);
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createTable = async (number) => {
    try {
      const res = await API.post("/table", { number });
      setData((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Error adding table:", error);
      setErr(error.message);
    }
  };

  const updateTable = async (id, isAvailable) => {
    try {
      const res = await API.put(`/table/${id}`, { isAvailable });
      setData((prev) =>
        prev.map((item) => (item._id === id ? res.data : item))
      );
    } catch (error) {
      console.error("Error updating table:", error);
      setErr(error.message);
    }
  };

  useEffect(() => {
    getTables();
  }, []);

  return { data, loading, err, createTable, updateTable, getTables };
}
