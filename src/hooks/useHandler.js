import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const handler = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const searchHandler = () => {
    if (search.length) {
      navigate(`/search`);
    }
  };

  useEffect(() => {
    searchHandler();
  }, [search]);

  return { search, setSearch, searchHandler, navigate };
};
