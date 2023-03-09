const JobDetails = ({ job }) => {
  return (
    <div className='job-details'>
      <h4>{job.title}</h4>
      <p>Company: {job.company}</p>
      <p>Salary: {job.salary}</p>
      <p>Location: {job.location}</p>
      <p>{job.createdAt}</p>
    </div>
  );
};
export default JobDetails;
