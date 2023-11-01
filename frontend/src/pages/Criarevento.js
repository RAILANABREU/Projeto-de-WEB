import Icon from "../components/common/icons"
import Main from "../components/layout/Main"
import Input from "../components/common/Input"
import Head from "../components/layout/Head"
import Button from "../components/common/Button"

export default function CriarEvento(){
    return(
        <div className="page">
            <Head/>
            <div>
                <Main>
                    <h1>CRIAR EVENTO</h1>
                    <Icon type = 'foto-evento'/>

                    <Input id='título' name='titulo' type = 'text'/>
                    <Input id= 'descrição' name= 'descricao' type= 'text'/>
                    <Input id= 'chave pix' name= 'pix' type= 'text'/>
                    <Button type='add'/>
                    <Button type='cancelar/confirmar' name='CANCELAR' name2='CRIAR'/>
                </Main>
            </div>
        </div>
    )
}