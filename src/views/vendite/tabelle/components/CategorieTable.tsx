
import { useMemo, Fragment } from 'react'
import Table from '@/components/ui/Table'
import {
    useReactTable,
    getCoreRowModel,
    getExpandedRowModel,
    flexRender,
} from '@tanstack/react-table'
import { HiOutlineChevronRight, HiOutlineChevronDown } from 'react-icons/hi'
import type { ColumnDef, Row } from '@tanstack/react-table'
import type { ReactElement } from 'react'

type ReactTableProps<T> = {
    renderRowSubComponent: (props: { row: Row<T> }) => ReactElement
    getRowCanExpand: (row: Row<T>) => boolean
}

type Sottocategoria = {
    id_categoria: number
    id_sottocategoria: number
    sottocategoria: string
    descrizione: string
    stato: string
}

type Categoria = {
    id_categoria: number
    categoria: string
    descrizione: string
    stato: string
    subRows?: Sottocategoria[]
}

const Categorie: Categoria[] = [
    {
        id_categoria: 1,
        categoria: 'Abbigliamento Man',
        descrizione: 'Abbigliamento uomo',
        stato: 'ATTIVO',
        subRows: [
            {
                id_categoria: 1,
                id_sottocategoria: 1,
                sottocategoria: 'T-shirt',
                descrizione: 'T-shirt, polo e magliette',
                stato: 'ATTIVO',
            },
            {
                id_categoria: 1,
                id_sottocategoria: 2,
                sottocategoria: 'Felpa',
                descrizione: 'Felpe',
                stato: 'ATTIVO',
            },
            {
                id_categoria: 1,
                id_sottocategoria: 3,
                sottocategoria: 'Altro',
                descrizione: 'Pantaloni, camicie',
                stato: 'ATTIVO',
            },          
        ],
    },
    {
        id_categoria: 2,
        categoria: 'Abbigliamento Woman',
        descrizione: 'Abbigliamento donna',
        stato: 'ATTIVO',
        subRows: [
            {
                id_categoria: 2,
                id_sottocategoria: 1,
                sottocategoria: 'T-shirt',
                descrizione: 'T-shirt, polo e magliette',
                stato: 'ATTIVO',
            },
            {
                id_categoria: 2,
                id_sottocategoria: 2,
                sottocategoria: 'Felpa',
                descrizione: 'Felpe',
                stato: 'ATTIVO',
            },
            {
                id_categoria: 2,
                id_sottocategoria: 3,
                sottocategoria: 'Altro',
                descrizione: 'Pantaloni, camicie, gonne',
                stato: 'ATTIVO',
            },          
        ],
    },
    {
        id_categoria: 2,
        categoria: 'Abbigliamento Kid',
        descrizione: 'Abbigliamento bambini',
        stato: 'ATTIVO',
        subRows: [
            {
                id_categoria: 3,
                id_sottocategoria: 1,
                sottocategoria: 'T-shirt',
                descrizione: 'T-shirt, polo e magliette',
                stato: 'ATTIVO',
            },
            {
                id_categoria: 3,
                id_sottocategoria: 2,
                sottocategoria: 'Felpa',
                descrizione: 'Felpe',
                stato: 'ATTIVO',
            },
            {
                id_categoria: 3,
                id_sottocategoria: 3,
                sottocategoria: 'Altro',
                descrizione: 'Pantaloni, camicie, gonne, cappellini',
                stato: 'ATTIVO',
            },          
        ],
    },    
]

const { Tr, Th, Td, THead, TBody } = Table

function ReactTable({ renderRowSubComponent, getRowCanExpand }: ReactTableProps<Categoria>) {
    const columns = useMemo<ColumnDef<Categoria>[]>(
        () => [
            {
                // Make an expander cell
                header: () => null, // No header
                id: 'expander', // It needs an ID
                cell: ({ row }) => (
                    <>
                        {row.getCanExpand() ? (
                            <button
                                className="text-lg"
                                {...{ onClick: row.getToggleExpandedHandler() }}
                            >
                                {row.getIsExpanded() ? (
                                    <HiOutlineChevronDown />
                                ) : (
                                    <HiOutlineChevronRight />
                                )}
                            </button>
                        ) : null}
                    </>
                ),
                // We can override the cell renderer with a SubCell to be used with an expanded row
                subCell: () => null, // No expander on an expanded row
            },
            {
                header: 'Id',
                accessorKey: 'id_categoria',
            },
            {
                header: 'Categoria',
                accessorKey: 'categoria',
            },
            {
                header: 'Descrizione',
                accessorKey: 'descrizione',
            },            
            {
                header: 'Stato',
                accessorKey: 'stato',
            },
        ],
        []
    )

    const table = useReactTable({
        data: Categorie,
        columns,
        getRowCanExpand,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
    })

    return (
        <>
            <Table>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <Fragment key={row.id}>
                                <Tr>
                                    {/* first row is a normal row */}
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <td key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        )
                                    })}
                                </Tr>
                                {row.getIsExpanded() && (
                                    <Tr>
                                        {/* 2nd row is a custom 1 cell row */}
                                        <Td
                                            colSpan={
                                                row.getVisibleCells().length
                                            }
                                        >
                                            {renderRowSubComponent({ row })}
                                        </Td>
                                    </Tr>
                                )}
                            </Fragment>
                        )
                    })}
                </TBody>
            </Table>
        </>
    )
}

const renderSubComponent = ({ row }: { row: Row<Categoria> }) => {
    return (
        <pre style={{ fontSize: '10px' }}>
            <code>{JSON.stringify(row.original.subRows, null, 2)}</code>
        </pre>
    )
}

const CategorieTable = () => {
    return (
        <>
            <div className='font-bold mb-4'>                      
                Varianti e attributi
            </div>
            <ReactTable
            renderRowSubComponent={renderSubComponent}
            getRowCanExpand={() => true}
            />                     
        </>
    )
}

export default CategorieTable

