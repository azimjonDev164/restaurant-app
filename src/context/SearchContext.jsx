import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";


const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const searchHandler = () => {
    if (search.length) {
      navigate("/search");
    } else {
      navigate("/"); // if empty, go home
    }
  };

  return (
    <SearchContext.Provider
      value={{ search, setSearch, searchHandler, navigate }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
