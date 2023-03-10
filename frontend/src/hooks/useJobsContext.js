import { JobsContext } from '../context/JobContext';
import { useContext } from 'react';

export const useJobsContext = () => {
  const context = useContext(JobsContext);

  if (!context) {
    throw Error('useJobsContext mus be used inside the JobContextProvider');
  }

  return context;
};
