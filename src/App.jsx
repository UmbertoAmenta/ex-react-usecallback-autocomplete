import { useEffect, useState, useCallback } from "react";

import SearchBar from "./componentes/SearchBar";
import Suggestions from "./componentes/Suggestions";

export default function App() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [currProd, setCurrProd] = useState({});

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

  const fetchProduct = async (id) => {
    const request = await fetch(`http://localhost:5000/products/${id}`);
    const data = await request.json();
    setSearch("");
    setCurrProd(data);
  };

  useEffect(() => {
    fetchProducts(search);
  }, [search]);

  return (
    <>
      <SearchBar search={search} setSearch={setSearch} />
      <Suggestions
        products={products}
        isEmpty={search == ""}
        productDetails={fetchProduct}
        currProd={currProd}
      />
      {currProd.id && (
        <div className="product-details">
          <h2>{currProd.name}</h2>
          <img src={currProd.image} alt={currProd.name} />
          <p>{currProd.description}</p>
          <p>
            <strong>Prezzo:</strong> €{currProd.price}
          </p>
        </div>
      )}
    </>
  );
}
