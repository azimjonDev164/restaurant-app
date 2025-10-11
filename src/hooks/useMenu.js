import { useState } from "react";
import API from "../services/api";
import { useEffect } from "react";

export default function useMenu() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const getAllMenus = async () => {
    setLoading(true);
    try {
      const res = await API.get("/menu");
      setData(res.data);
    } catch (error) {
      console.error("Error adding table:", error);
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createMenu = async (name) => {
    try {
      const res = await API.post("/menu", { name });
      setData((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Error adding table:", error);
      setErr(error.message);
    }
  };
  
  const updateMenu = async (id, name) => {
    try {
      const res = await API.put(`/menu/${id}`, { name });
      setData((prev) =>
        prev.map((item) => (item._id === id ? res.data : item))
      );
    } catch (error) {
      console.error("Error deleting dish:", error);
      setErr(error.message);
    }
  };

  const deleteMenu = async (id) => {
    try {
      await API.delete(`/menu/${id}`);
      setData((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting dish:", error);
      setErr(error.message);
    }
  };

  useEffect(() => {
    getAllMenus();
  }, []);

  return {
    data,
    loading,
    err,
    createMenu,
    getAllMenus,
    updateMenu,
    deleteMenu,
  };
}
