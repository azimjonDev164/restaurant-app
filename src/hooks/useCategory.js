import { useState } from "react";

export default function useCategory() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const createCategory = async () => {};
  const updateCategory = async () => {};
  const deleteCategory = async () => {};

  return { data, loading, err, createCategory, updateCategory, deleteCategory };
}
