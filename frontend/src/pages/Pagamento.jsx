import Head from "../components/layout/Head";
import Main from "../components/layout/Main";
import Input from "../components/common/Input";
import Checkbox from "../components/common/Checkbox";
import Button from "../components/common/Button";

export default function Pagamento(){
    return(
        <div className="page">
            <Head/>
            <Main>
                <h1>TÍTULO DO EVENTO</h1>
                <div className="valor-total"/>
                <div className="pix"/>
                <ListaDePagamento/>
                <Button type='confirmar' name='SALVAR'/>
            </Main>
        </div>
    )
}

function ListaDePagamento(){
    return(
        <>
            <ul>
                
            </ul>
        </>
    )
}