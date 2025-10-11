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
  const updateCategory = async () => {};
  const deleteCategory = async () => {};

  useEffect(() => {
    getAllCategories();
  }, []);

  return { data, loading, err, createCategory, updateCategory, deleteCategory, getAllCategories};
}
