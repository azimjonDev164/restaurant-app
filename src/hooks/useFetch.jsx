import { useEffect, useState } from "react";

const useFetch = async () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://");
      setData(res.data);
    } catch (error) {
      console.log(err);
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, err };
};

export default useFetch;
