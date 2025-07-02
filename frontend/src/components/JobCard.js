import React from 'react';
// import './JobCard.css';

function JobCard({ job, onDelete }) {
  return (
    <div className="job-card">
      <h2>{job.title}</h2>
      <p><strong>🏢 Company:</strong> {job.company}</p>
      <p><strong>📍 Location:</strong> {job.location}</p>
      <p><strong>📌 Type:</strong> {job.job_type}</p>
      <p><strong>📅 Date:</strong> {job.posting_date}</p>
      <p><strong>🏷️ Tags:</strong> {job.tags}</p>
      <button className="delete-btn" onClick={() => onDelete(job.id)}>🗑️ Delete</button>
    </div>
  );
}

export default JobCard;