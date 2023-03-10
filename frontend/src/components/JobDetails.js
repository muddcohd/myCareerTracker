import { useJobsContext } from '../hooks/useJobsContext';

const JobDetails = ({ job }) => {
  const { dispatch } = useJobsContext();

  const handleClick = async () => {
    const response = await fetch('/api/jobs/' + job._id, {
      method: 'DELETE',
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_JOB', payload: json });
    }
  };

  return (
    <div className='job-details'>
      <h4>{job.title}</h4>
      <p>Company: {job.company}</p>
      <p>Salary: {job.salary}</p>
      <p>Location: {job.location}</p>
      <p>{job.createdAt}</p>
      <span onClick={handleClick}>Delete</span>
    </div>
  );
};
export default JobDetails;
