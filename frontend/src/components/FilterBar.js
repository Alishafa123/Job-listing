import React from 'react';

function FilterBar({ filters, setFilters }) {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      job_type: '',
      location: '',
      sort: 'desc',
    });
  };

  return (
    <div className="filter-bar">
      <input
        type="text"
        name="search"
        placeholder="Search title or company"
        value={filters.search}
        onChange={handleChange}
      />

      <select name="job_type" value={filters.job_type} onChange={handleChange}>
        <option value="">All Types</option>
        <option value="Full-Time">Full-Time</option>
        <option value="Part-Time">Part-Time</option>
        <option value="Internship">Internship</option>
      </select>

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={filters.location}
        onChange={handleChange}
      />

      <select name="sort" value={filters.sort} onChange={handleChange}>
        <option value="desc">Newest First</option>
        <option value="asc">Oldest First</option>
      </select>

      <button onClick={clearFilters} style={{
        background: '#dc3545',
        color: 'white',
        padding: '0.5rem 1rem',
        border: 'none',
        borderRadius: '6px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginLeft: '1rem'
      }}>
        🔄 Clear Filters
      </button>
    </div>
  );
}

export default FilterBar;
