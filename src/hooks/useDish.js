import { useState } from "react";

export default function useDish() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const createDish = async () => {};
  const updateDish = async () => {};
  const deleteDish = async () => {};

  return { data, loading, err, createDish, updateDish, deleteDish };
}
