import { useState } from "react";

export default function useTable() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const createTable = async () => {};
  const updateTable = async () => {};
  const deleteTable = async () => {};

  return { data, loading, err, createTable, updateTable, deleteTable };
}
