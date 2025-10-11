import { useEffect, useState } from "react";
import API from "../services/api";

export default function useDish() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // ✅ Get all dishes
  const getDishes = async () => {
    setLoading(true);
    try {
      const res = await API.get("/dish");
      setData(res.data);
    } catch (error) {
      console.error("Error fetching dishes:", error);
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Create new dish
  const createDish = async (formData) => {
    try {
      const res = await API.post("/dish", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setData((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Error creating dish:", error);
      setErr(error.message);
    }
  };

  const updateDish = async (id, formData) => {
    try {
      const res = await API.put(`/dish/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setData((prev) =>
        prev.map((item) => (item._id === id ? res.data : item))
      );
    } catch (error) {
      console.error("Error deleting dish:", error);
      setErr(error.message);
    }
  };

  // ✅ Delete dish
  const deleteDish = async (id) => {
    try {
      await API.delete(`/dish/${id}`);
      setData((prev) => prev.filter((dish) => dish._id !== id));
    } catch (error) {
      console.error("Error deleting dish:", error);
      setErr(error.message);
    }
  };

  useEffect(() => {
    getDishes();
  }, []);

  return { data, loading, err, createDish, deleteDish, getDishes, updateDish };
}
