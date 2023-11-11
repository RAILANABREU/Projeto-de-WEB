import Head from "../components/layout/Head";
import Main from "../components/layout/Main";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Icon from "../components/common/icons";


export default function Gastos(){
    return(
        <div className="page">
            <Head/>
            <Main>
                <h1>GASTOS</h1>
                <Icon type='foto-comprovante'/>
                <Input
                id ="local"
                name="local"
                type="text"/>
                <Input
                id ="descricao"
                name="descricao"
                type="text"/>
                <Input
                id ="valor"
                name="valor"
                type="number"/>

                <Button type="cancelar/confirmar"
                name='CANCELAR'
                name2='ADICIONAR'/>
            </Main>
        </div>
    )
}