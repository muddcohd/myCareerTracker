import { useJobsContext } from '../hooks/useJobsContext';
import formatDistanceFromNow from 'date-fns/formatDistanceToNow';
import { useAuthContext } from '../hooks/useAuthContext';

const JobDetails = ({ job }) => {
  const { dispatch } = useJobsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch('/api/jobs/' + job._id, {
      method: 'DELETE',
      headers: {
        //prettier-ignore
        "Authorization": `Bearer ${user.token}`,
      },
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
      <p>
        {formatDistanceFromNow(new Date(job.createdAt), { addSuffix: true })}
      </p>
      <span className='material-symbols-outlined' onClick={handleClick}>
        Delete
      </span>
    </div>
  );
};
export default JobDetails;
