
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addJob, getJobs, updateJob } from '../services/api';
import JobForm from '../components/JobForm';

function AddJob() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [jobToEdit, setJobToEdit] = useState(null);

  useEffect(() => {
    if (id) {
      getJobs().then((res) => {
        const found = res.data.find((job) => job.id === parseInt(id));
        if (found) setJobToEdit(found);
      });
    }
  }, [id]);

  const handleSubmit = async (jobData) => {
    try {
      if (id) {
        await updateJob(id, jobData);
        alert('✅ Job updated!');
      } else {
        await addJob(jobData);
        alert('✅ Job added!');
      }
      navigate('/');
    } catch (err) {
      alert('❌ Something went wrong.');
    }
  };

  return (
    <div className="add-job-container">
      <h2>{id ? '✏️ Edit Job' : '📝 Add Job'}</h2>
      <JobForm onSubmit={handleSubmit} initialData={jobToEdit} />
    </div>
  );
}

export default AddJob;
