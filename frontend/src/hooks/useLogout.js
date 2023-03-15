import { useAuthContext } from './useAuthContext';
import { useJobsContext } from './useJobsContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: jobsDispatch } = useJobsContext();

  const logout = () => {
    //removing user from the local storage
    localStorage.removeItem('user');

    //dispatch logout action
    dispatch({ type: 'LOGOUT' });
    jobsDispatch({ type: 'SET_JOBS', payload: null });
  };
  return { logout };
};
export default useLogout;
