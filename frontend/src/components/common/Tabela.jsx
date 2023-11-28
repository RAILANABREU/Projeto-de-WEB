
import { useParams } from "react-router-dom";
import style from "./Tabela.module.css";
import Cookies from "js-cookie";
import { alterarConvidados } from "../../services/eventosServices";

export default function Tabela({ convidados }) {
    const atualizarPagina = () => {
        window.location.reload();
      };
    const {userId, eventoId} = useParams()

    const atualizar = async(convidadoId, japagou) =>{
        const data = {idEvento: eventoId, idConvidado: convidadoId, jaPagou: `${japagou}` }
        console.log(data)
        try{
            const response = await alterarConvidados(data, Cookies.get("token"));
            if(response.success){
                console.log(response)
                atualizarPagina();
            }
        }catch(error){
            console.log("não foi possivel enviar atualização de convidado")
        }
    }
    return (
        <div className={style.container}>
        <table>
            <thead>
            <tr>
                <th>Convidados</th>
                <th>Status de Pagamento</th>
            </tr>
            </thead>
            <tbody>
            {convidados?.map((convidado, index) => (
                <tr key={index} className={style.item}>
                <td>{convidado.username}</td>
                <td>
                    <button
                    className={style.botao}
                    onClick={() => atualizar(convidado.idConvidado, !convidado.jaPagou)}
                    >
                    {convidado.jaPagou === true ? "Pago" : "Não Pago"}
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}
