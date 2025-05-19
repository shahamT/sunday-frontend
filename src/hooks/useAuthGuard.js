import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function useAuthGuard() {
  const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loggedinUser) {
      navigate('/login', {
        replace: true, // replaces current entry in history
        state: { from: location.pathname }, // still keeps info
      });
    }
  }, [loggedinUser, location.pathname, navigate]);

  return loggedinUser
}

// useAuthGuard();

// function onLoginSuccess() {
//   const from = location.state?.from || '/';
//   navigate(from);
// }