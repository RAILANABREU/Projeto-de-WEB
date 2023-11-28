import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { FindUserByID } from './services/userServices';
import { getEventoByID } from './services/eventosSevices';

export const useData = (userId, eventoId) => {
  const [userData, setUserData] = useState(null);
  const [eventoData, setEvento] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userFound = await FindUserByID(userId, Cookies.get('token'));
        setUserData(userFound);

        const response = await getEventoByID(eventoId, Cookies.get('token'));
        setEvento(response.evento);
      } catch (error) {
        console.error('Erro ao buscar informações:', error);
      }
    };

    fetchData();
  }, [userId, eventoId]);

  return { userData, eventoData };
};

export default useData;
