import React, { useState } from 'react';
// import './JobForm.css';

function JobForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    job_type: 'Full-Time',
    tags: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const job = {
      ...formData,
      tags: formData.tags.split(',').map((tag) => tag.trim()),
    };
    onSubmit(job);
    setFormData({ title: '', company: '', location: '', job_type: 'Full-Time', tags: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="job-form">
      <input name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} required />
      <input name="company" placeholder="Company" value={formData.company} onChange={handleChange} required />
      <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
      <select name="job_type" value={formData.job_type} onChange={handleChange}>
        <option>Full-Time</option>
        <option>Part-Time</option>
        <option>Internship</option>
      </select>
      <input name="tags" placeholder="Tags (comma separated)" value={formData.tags} onChange={handleChange} />
      <button type="submit">➕ Add Job</button>
    </form>
  );
}

export default JobForm;