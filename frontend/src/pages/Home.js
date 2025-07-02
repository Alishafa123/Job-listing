import React, { useEffect, useState } from 'react';
import { getJobs, deleteJob, updateJob } from '../services/api';
import JobCard from '../components/JobCard';
import FilterBar from '../components/FilterBar';

function Home() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ search: '', job_type: '', location: '', sort: 'desc' });

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    try {
      const params = {
        search: filters.search,
        job_type: filters.job_type,
        location: filters.location,
        sort: filters.sort,
      };
      const res = await getJobs(params);
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
      <FilterBar filters={filters} setFilters={setFilters} />
      <div className="job-list">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default Home;