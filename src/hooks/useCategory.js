import { useState } from "react";
import API from "../services/api";
import { useEffect } from "react";

export default function useCategory() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const getAllCategories = async () => {
    setLoading(true);
    try {
      const res = await API.get("/category");
      setData(res.data);
    } catch (error) {
      console.error("Error adding table:", error);
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (name, menu) => {
    try {
      const res = await API.post("/category", { name, menu });
      setData((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Error adding table:", error);
      setErr(error.message);
    }
  };
  const updateCategory = async (id, body) => {
    try {
      const res = await API.put(`/category/${id}`, body);
      setData((prev) =>
        prev.map((item) => (item._id === id ? res.data : item))
      );
    } catch (error) {
      console.error("Error deleting dish:", error);
      setErr(error.message);
    }
  };
  const deleteCategory = async (id) => {
    try {
      await API.delete(`/category/${id}`);
      setData((prev) => prev.filter((dish) => dish._id !== id));
    } catch (error) {
      console.error("Error deleting dish:", error);
      setErr(error.message);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return {
    data,
    loading,
    err,
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategories,
  };
}
