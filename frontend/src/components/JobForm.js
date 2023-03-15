import { useState } from 'react';
import { useJobsContext } from '../hooks/useJobsContext';
import { useAuthContext } from '../hooks/useAuthContext';

const JobForm = () => {
  const { dispatch } = useJobsContext();
  const { user } = useAuthContext();
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [salary, setSalary] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    const job = { title, company, salary, location };

    const response = await fetch('/api/jobs', {
      method: 'POST',
      body: JSON.stringify(job),
      headers: {
        'Content-Type': 'application/json',
        //prettier-ignore
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle('');
      setCompany('');
      setSalary('');
      setLocation('');
      setError(null);
      setEmptyFields([]);
      console.log('new workout created', json);
      dispatch({ type: 'CREATE_JOB', payload: json });
    }
  };
  return (
    <form className='create' onSubmit={handleSubmit}>
      <h3>Add a New Job :</h3>
      <label>Job Title:</label>
      <input
        type='text'
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />
      <label>Company:</label>
      <input
        type='text'
        onChange={(e) => setCompany(e.target.value)}
        value={company}
        className={emptyFields.includes('company') ? 'error' : ''}
      />
      <label>Salary:</label>
      <input
        type='number'
        onChange={(e) => setSalary(e.target.value)}
        value={salary}
      />
      <label>Location:</label>
      <input
        type='text'
        onChange={(e) => setLocation(e.target.value)}
        value={location}
        className={emptyFields.includes('location') ? 'error' : ''}
        s
      />
      <button>Add Job</button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
};
export default JobForm;
