
import React from 'react';
import { useNavigate } from 'react-router-dom';

function JobCard({ job, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="job-card">
      <h2>{job.title}</h2>
      <p><strong>🏢 Company:</strong> {job.company}</p>
      <p><strong>📍 Location:</strong> {job.location}</p>
      <p><strong>📌 Type:</strong> {job.job_type}</p>
      <p><strong>📅 Date:</strong> {job.posting_date}</p>
      <p><strong>🏷️ Tags:</strong> {job.tags}</p>

      <button className="delete-btn" onClick={() => onDelete(job.id)}>🗑️ Delete</button>
      <button
        className="edit-btn"
        style={{ marginLeft: '10px', backgroundColor: '#007bff' }}
        onClick={() => navigate(`/edit/${job.id}`)}
      >
        ✏️ Edit
      </button>
    </div>
  );
}

export default JobCard;
