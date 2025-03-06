import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (event) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="mb-4 w-full">
      <input
        type="text"
        className="w-full p-2 border outline-none border-gray-300 rounded-lg"
        placeholder="Search products..."
        value={query}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
