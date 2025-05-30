import { useEffect, useState } from "react";

import SearchBar from "./componentes/SearchBar";
import Suggestions from "./componentes/Suggestions";

export default function App() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const request = await fetch(
        `http://localhost:5000/products?search=${search}`
      );
      const data = await request.json();
      setProducts(data);
    };
    fetchProducts();
  }, [search]);

  return (
    <>
      <SearchBar search={search} setSearch={setSearch} />
      <Suggestions products={products} isEmpty={search == ""} />
    </>
  );
}
