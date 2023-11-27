

export default function Tabela(){
    return(
        <div>
            <h2>Tabela de Convidados</h2>
                <table>
                <thead>
                    <tr>
                    <th>Convidados</th>
                    <th>Pago</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>Convidado 1</td>
                    <td><input type="checkbox" name="pago1"/></td>
                    </tr>
                    <tr>
                    <td>Convidado 2</td>
                    <td><input type="checkbox" name="pago2"/></td>
                    </tr>
                </tbody>
                </table>
        </div>
    )
}