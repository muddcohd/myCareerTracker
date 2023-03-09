import { useEffect, useState } from 'react';

import JobDetails from '../components/JobDetails';
import JobForm from '../components/JobForm';

const Home = () => {
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch('http://localhost:4500/api/jobs');
      const jobsJson = await response.json();

      if (response.ok) {
        setJobs(jobsJson);
      }
    };
    fetchJobs();
  }, []);
  return (
    <div className='home'>
      <div className='jobs'>
        {jobs && jobs.map((job) => <JobDetails key={job._id} job={job} />)}
      </div>
      <JobForm />
    </div>
  );
};
export default Home;
