import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FindUserByID } from './services/userServices';

const useAuth = () => {
  const navigate = useNavigate();
  const {userId} = useParams();

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get('token');

      if (!token) {
        navigate('/signin');
      } else {
        try {
          const user = await FindUserByID(userId, token);
          if (!user) {
            navigate('/signin');
          }
        } catch (error) {
          console.error('Erro ao verificar usuário:', error.message);
          navigate('/signin');
        }
      }
    };

    checkAuth();
  }, [navigate]);
};

export default useAuth;
