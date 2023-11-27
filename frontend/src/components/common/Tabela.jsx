import style from "./Tabela.module.css"

export default function Tabela({convidados}){
    return(
        <div class={style.container}>
            <table>
                <thead>
                    <tr>
                    <th>Convidados</th>
                    <th>Pago</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class={style.item}>
                    <td>Convidado 1</td>
                    <td><input className={style.chekbox} type="checkbox" name="pago1"/></td>
                    </tr>
                    <tr class={style.item}>
                    <td>Convidado 2</td>
                    <td><input type="checkbox" name="pago2"/></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}