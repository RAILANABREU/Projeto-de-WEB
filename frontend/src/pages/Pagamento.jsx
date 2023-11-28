// Pagamento.js
import Head from "../components/layout/Head";
import Main from "../components/layout/Main";
import Tabela from "../components/common/Tabela";
import Footer from "../components/layout/Footer";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../useAuth";
import useData from "../useData";
import style from "./Pagamento.module.css";
import { useEffect, useState } from "react";

export default function Pagamento() {
  useAuth();
  const { userId, eventoId } = useParams();
  const { userData, eventoData } = useData(userId, eventoId);
  const [valorUnitario, setValorUnitario] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const calcularValorUnitario = () => {
      if (eventoData?.convidados.length > 0) {
        const valorUnitarioCalculado = eventoData?.gastos.total / (eventoData?.convidados.length + 1);

        const valorUnitarioArredondado = parseFloat(valorUnitarioCalculado.toFixed(2));
        setValorUnitario(valorUnitarioArredondado);
      } else {
        setValorUnitario(0);
      }
    };

    calcularValorUnitario();
  }, [eventoData]);

  return (
    <div className="page">
      <Head onIconClick={() => navigate(`/home/${userId}`)} />
      <Main>
        <h1>{eventoData?.titulo.toUpperCase()}</h1>
        <div className={style.valores}>
          <div className={style.valor}>TOTAL: {eventoData?.gastos.total}</div>
          <div className={style.valor}>Custo Unitário: {valorUnitario}</div>
        </div>
        <div className="pix" />
        <Tabela convidados={eventoData?.convidados}/>
      </Main>
      <Footer />
    </div>
  );
}
