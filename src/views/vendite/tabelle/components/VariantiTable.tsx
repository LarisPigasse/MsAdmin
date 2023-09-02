
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

type Attributo = {
    id_variante: number
    id_attributo: number
    attributo: string
    stato: string
}

type Variante = {
    id_variante: number
    variante: string
    stato: string
    subRows?: Attributo[]
}

const Varianti: Variante[] = [
    {
        id_variante: 1,
        variante: 'Taglia',
        stato: 'ATTIVO',
        subRows: [
            {
                id_variante: 1,
                id_attributo: 1,
                attributo: 'M',
                stato: 'ATTIVO',
            },
            {
                id_variante: 1,
                id_attributo: 2,
                attributo: 'L',
                stato: 'ATTIVO',
            },
            {
                id_variante: 1,
                id_attributo: 3,
                attributo: 'XL',
                stato: 'ATTIVO',
            },
            {
                id_variante: 1,
                id_attributo: 4,
                attributo: 'XXL',
                stato: 'ATTIVO',
            },            
        ],
    },
    {
        id_variante: 2,
        variante: 'Colore',
        stato: 'ATTIVO',
        subRows: [
            {
                id_variante: 2,
                id_attributo: 1,
                attributo: 'Giallo',
                stato: 'ATTIVO',
            },
            {
                id_variante: 2,
                id_attributo: 2,
                attributo: 'Rosso',
                stato: 'ATTIVO',
            },
            {
                id_variante: 2,
                id_attributo: 3,
                attributo: 'Bianco',
                stato: 'ATTIVO',
            },
            {
                id_variante: 2,
                id_attributo: 4,
                attributo: 'Nero',
                stato: 'ATTIVO',
            },            
        ],
    },
]

const { Tr, Th, Td, THead, TBody } = Table

function ReactTable({ renderRowSubComponent, getRowCanExpand }: ReactTableProps<Variante>) {
    const columns = useMemo<ColumnDef<Variante>[]>(
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
                accessorKey: 'id_variante',
            },
            {
                header: 'Variante',
                accessorKey: 'variante',
            },
            {
                header: 'Stato',
                accessorKey: 'stato',
            },
        ],
        []
    )

    const table = useReactTable({
        data: Varianti,
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

const renderSubComponent = ({ row }: { row: Row<Variante> }) => {
    return (
        <pre style={{ fontSize: '10px' }}>
            <code>{JSON.stringify(row.original, null, 2)}</code>
        </pre>
    )
}

const VariantiTable = () => {
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

export default VariantiTable

