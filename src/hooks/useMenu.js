import { useState } from "react";

export default function useMenu() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const createMenu = async () => {};
  const updateMenu = async () => {};
  const deleteMenu = async () => {};

  return { data, loading, err, createMenu, updateMenu, deleteMenu };
}
