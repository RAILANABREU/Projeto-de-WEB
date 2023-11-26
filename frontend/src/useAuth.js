// useAuth.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');

    if (!token) {
      navigate('/signin');
    }
  }, [navigate]);
};

export default useAuth;
