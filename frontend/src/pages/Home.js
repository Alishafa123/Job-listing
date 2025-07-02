import React, { useEffect, useState } from 'react';
import { getJobs, deleteJob } from '../services/api';
import JobCard from '../components/JobCard';
// import './Home.css';

function Home() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await getJobs();
      setJobs(res.data);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      await deleteJob(id);
      fetchJobs();
    }
  };

  return (
    <div className="home-container">
      <h2>📋 All Jobs</h2>
      <div className="job-list">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default Home;