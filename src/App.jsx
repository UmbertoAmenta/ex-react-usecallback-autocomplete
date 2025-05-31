import { useEffect, useState, useCallback } from "react";

import SearchBar from "./componentes/SearchBar";
import Suggestions from "./componentes/Suggestions";

export default function App() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  function debounce(call, delay) {
    let timer;
    return (value) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        call(value);
      }, delay);
    };
  }

  const fetchProducts = useCallback(
    debounce(async (search) => {
      if (search === "") {
        setProducts([]);
        return;
      }

      const request = await fetch(
        `http://localhost:5000/products?search=${search}`
      );
      const data = await request.json();
      setProducts(data);
    }, 300),
    []
  );

  useEffect(() => {
    fetchProducts(search);
  }, [search]);

  return (
    <>
      <SearchBar search={search} setSearch={setSearch} />
      <Suggestions products={products} isEmpty={search == ""} />
    </>
  );
}
