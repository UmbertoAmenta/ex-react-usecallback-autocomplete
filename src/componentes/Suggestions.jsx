export default function Suggestions({ products, isEmpty, productDetails }) {
  if (isEmpty || products.length === 0) return null;

  return (
    <ul className="suggestions">
      {products.map((p) => (
        <li key={p.id} onClick={() => productDetails(p.id)}>
          {p.name}
        </li>
      ))}
    </ul>
  );
}
