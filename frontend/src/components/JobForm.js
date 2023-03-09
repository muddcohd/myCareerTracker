import { useState } from 'react';

const JobForm = () => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [salary, setSalary] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const job = { title, company, salary, location };

    const response = await fetch('http://localhost:4500/api/jobs', {
      method: 'POST',
      body: JSON.stringify(job),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setTitle('');
      setCompany('');
      setSalary('');
      setLocation('');
      setError(null);
      console.log('new workout created', json);
    }
  };
  return (
    <form className='form' onSubmit={handleSubmit}>
      <h3>Add a New Job :</h3>
      <label>Job Title:</label>
      <input
        type='text'
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <label>Company:</label>
      <input
        type='text'
        onChange={(e) => setCompany(e.target.value)}
        value={company}
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
      />
      <button>Add Job</button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
};
export default JobForm;
