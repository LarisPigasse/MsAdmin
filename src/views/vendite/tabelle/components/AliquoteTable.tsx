import Table from '@/components/ui/Table'

const { Tr, Th, Td, THead, TBody } = Table

type Aliquota = {
    id_aliquota: number
    aliquota: number
    descrizione: string
    stato: string
}

const Aliquote: Aliquota[] = [
    {
        id_aliquota: 1,
        aliquota: 22,
        descrizione: 'Aliquota al 22%',
        stato: 'ATTIVO',
    },
    {
        id_aliquota: 1,
        aliquota: 10,
        descrizione: 'Aliquota al 10%',
        stato: 'ATTIVO',
    },
    {
        id_aliquota: 3,
        aliquota: 4,
        descrizione: 'Aliquota al 4%',
        stato: 'ATTIVO',
    },        
]


const rows = Aliquote.map((aliquota) => {
    return (
        <tr key={aliquota.id_aliquota}>
            <td>{aliquota.id_aliquota}</td>
            <td>{aliquota.aliquota}</td>
            <td>{aliquota.descrizione}</td>
            <td>{aliquota.stato}</td>
        </tr>
    );
});

const AliquoteTable = () => {
    return (
        <div>
            <div className='font-bold mb-4'>                      
                Aliquote IVA
            </div>
            <div>
                <Table>
                    <THead>
                        <Tr>
                            <Th>Id</Th>
                            <Th>Aliquota</Th>
                            <Th>Descrizione</Th>
                            <Th>Stato</Th>
                        </Tr>
                    </THead>
                    <TBody>
                        {rows}                   
                    </TBody>
                </Table>
            </div>
        </div>
    )
}

export default AliquoteTable