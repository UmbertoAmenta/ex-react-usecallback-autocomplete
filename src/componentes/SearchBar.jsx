export default function ({ search, setSearch }) {
  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Cerca..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
