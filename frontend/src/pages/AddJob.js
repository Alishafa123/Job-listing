import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addJob } from '../services/api';
import JobForm from '../components/JobForm';

function AddJob() {
  const navigate = useNavigate();

  const handleAddJob = async (job) => {
    try {
      await addJob(job);
      alert('✅ Job added successfully!');
      navigate('/');
    } catch (error) {
      alert('❌ Failed to add job.');
    }
  };

  return (
    <div className="add-job-container">
      <h2>📝 Add New Job</h2>
      <JobForm onSubmit={handleAddJob} />
    </div>
  );
}

export default AddJob;