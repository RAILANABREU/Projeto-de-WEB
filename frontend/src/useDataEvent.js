import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { getEventoByID } from "./services/eventosServices";

const useDataEvent = (eventoId) =>{
    const [eventoData, setEvento] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getEventoByID(eventoId, Cookies.get('token'));
          setEvento(response.evento);
        } catch (error) {
          console.error('Erro ao buscar evento:', error);
        }
      };
  
      fetchData();
    }, [eventoId]);
  
    return {eventoData};
  };

  export default useDataEvent;