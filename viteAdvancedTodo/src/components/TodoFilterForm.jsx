import "../styles/styles.css";
export function TodoFilterForm({ name, setFilteredName }) {
  return (
    <div className="filter-form">
      <div className="filter-form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setFilteredName(e.target.value)}
        />
      </div>
      <label>
        <input type="checkbox" />
        Hide Completed
      </label>
    </div>
  );
}
