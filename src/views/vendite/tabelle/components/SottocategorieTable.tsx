
import { useMemo, Fragment, useEffect, useState, ReactElement, useCallback } from 'react'

import Tooltip from '@/components/ui/Tooltip'
import Table from '@/components/ui/Table'
import {
    useReactTable,
    getCoreRowModel,
    getExpandedRowModel,
    flexRender,
} from '@tanstack/react-table'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { apiGetSottocategorie } from '@/services/CategorieSottocategorieService';

import { HiOutlineChevronRight, HiOutlineChevronDown, HiOutlineEye, HiOutlineTrash } from 'react-icons/hi'
import type { ColumnDef, Row } from '@tanstack/react-table'

import {
    useAppDispatch,
    toggleNewSottocategoriaDialog,
    useAppSelector,
    setDatiSottocategoria,
    getSottocategorie
} from '../store'

type ReactTableProps<T> = {
    getRowCanExpand: (row: Row<T>) => boolean
    data : any
}

type Sottocategoria = {
    id_categoria: number
    id_sottocategoria: number
    sottocategoria: string
    descrizione: string
    stato: string
}

const ActionColumn = ({row} : { row: any}) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    //const navigate = useNavigate()

    const onDelete = () => {
    //     // dispatch(setDeleteMode('single'))
    //     // dispatch(setSelectedRow([row.id_operatore]))
    }

    const onView = useCallback(() => {
        dispatch(setDatiSottocategoria(row))
        dispatch(toggleNewSottocategoriaDialog(true))
    }, [row])

    return (
        <div className="flex justify-end text-lg">
            <Tooltip title="View">
                <span
                    className={`cursor-pointer p-2 hover:${textTheme}`}
                    onClick={onView}
                >
                    <HiOutlineEye />
                </span>
            </Tooltip>
            <Tooltip title="Delete">
                <span
                    className="cursor-pointer p-2 hover:text-red-500"
                    onClick={onDelete}
                >
                    <HiOutlineTrash />
                </span>
            </Tooltip>
        </div>
    )
}

const { Tr, Th, Td, THead, TBody } = Table

function ReactTable({ getRowCanExpand, data }: ReactTableProps<Sottocategoria>) {
    const columns = useMemo<ColumnDef<Sottocategoria>[]>(
        () => [
            {
                header: 'Id',
                accessorKey: 'id_sottocategoria',
            },
            {
                header: 'Sottocategoria',
                accessorKey: 'sottocategoria',
            },
            {
                header: 'Descrizione',
                accessorKey: 'descrizione',
            },            
            {
                header: 'Stato',
                accessorKey: 'stato',
            },
            {
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        []
    )

    const table = useReactTable({
        data,
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

const SottocategorieTable = ({data} : any) => {

    //const [sottocategorie, setSottocategorie] = useState([])

    const dispatch = useAppDispatch()
    const sottocategorie = useAppSelector((state) => state.venditeTabelle.data.sottocategorie)
    const id_categoria = useAppSelector((state) => state.venditeTabelle.data.id_categoria)
    const datiSottocategoria = useAppSelector((state) => state.venditeTabelle.data.datiSottocategoria)

    // const getSottocategorie = async () => {
    //     let a = await apiGetSottocategorie();
    //     let res : any = await a.data;
    //     console.log(res)
    //     setSottocategorie(res);
    // }

    // const getSottocategorie = async () => {
    //     const response = await apiGetSottocategorie(data)
    //     let responseData :any = response.data;
    //     setSottocategorie(responseData);
    //     return 
    // }

    const fetchData = useCallback(() => {
        //getSottocategorie()
        dispatch(getSottocategorie(data))
    }, [])

    useEffect(() => {
        fetchData()
    }, [])




    return (
        <>
            <div className='font-bold mb-4'>                      
               Sottocategorie
            </div>
            <ReactTable
                getRowCanExpand={() => true}
                data={sottocategorie}
            />
        </>
    )
}

export default SottocategorieTable

