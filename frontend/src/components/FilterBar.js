import React from 'react';

function FilterBar({ filters, setFilters }) {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="filter-bar">
      <input
        type="text"
        name="search"
        placeholder="Search by title or company"
        value={filters.search}
        onChange={handleChange}
      />
      <select name="job_type" value={filters.job_type} onChange={handleChange}>
        <option value="">All Types</option>
        <option>Full-Time</option>
        <option>Part-Time</option>
        <option>Internship</option>
      </select>
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={filters.location}
        onChange={handleChange}
      />
      <select name="sort" value={filters.sort} onChange={handleChange}>
        <option value="desc">Newest</option>
        <option value="asc">Oldest</option>
      </select>
    </div>
  );
}

export default FilterBar;