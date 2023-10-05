
import { useMemo, Fragment, useEffect, useState, useCallback } from 'react'
import Tooltip from '@/components/ui/Tooltip'
import { HiOutlineEye, HiOutlineTrash, HiPlusCircle } from 'react-icons/hi'
import {Table, Button} from '@/components/ui'
import { HiDownload } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import {
    useReactTable,
    getCoreRowModel,
    getExpandedRowModel,
    flexRender,
} from '@tanstack/react-table'
import SottocategorieTable from './SottocategorieTable';
import { apiGetCategorie } from '@/services/CategorieSottocategorieService';
import useThemeClass from '@/utils/hooks/useThemeClass'
import { HiOutlineChevronRight, HiOutlineChevronDown } from 'react-icons/hi'
import type { ColumnDef, Row } from '@tanstack/react-table'
import type { ReactElement } from 'react'

import NewCategorieDialog from './NewCategorieDialog';
import NewSottocategoriaDialog from './NewSottocategoriaDialog';

import {
    useAppDispatch,
    getCategorie,
    useAppSelector,
    toggleNewCategoriaDialog,
    toggleNewSottocategoriaDialog,
    setDatiCategoria,
    setIdCategoria
} from '../store'


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

const ActionColumn = ({row} : { row: any}) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onDelete = () => {
    //     // dispatch(setDeleteMode('single'))
    //     // dispatch(setSelectedRow([row.id_operatore]))
    }

    const onView = useCallback(() => {
        dispatch(setDatiCategoria(row))
        dispatch(toggleNewCategoriaDialog(true))
    }, [row])

    const onAddSottocategoria = useCallback(() => {
        dispatch(setIdCategoria(row.id_categoria))
        dispatch(toggleNewSottocategoriaDialog(true))
    }, [row])

    return (
        <div className="flex justify-end text-lg">
            <Tooltip title="Aggiungi sottocategoria">
                <span
                    className={`cursor-pointer p-2 hover:${textTheme}`}
                    onClick={onAddSottocategoria}
                >
                    <HiPlusCircle />
                </span>
            </Tooltip>
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

function ReactTable({ renderRowSubComponent, getRowCanExpand }: ReactTableProps<Categoria>) {
    
    const categorie = useAppSelector((state) => state.venditeTabelle.data.categorie)

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
            {
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        []
    )

    const dispatch = useAppDispatch()

    const fetchData = useCallback(() => {
        dispatch(getCategorie())
    }, [])

    useEffect(() => {
        fetchData()
    }, [dispatch, fetchData])

    // const getCategorie = async () => {
    //     let a = await apiGetCategorie();
    //     let res : any = await a.data;
    //     console.log(res)
    //     setCategorie(res);
    // }

    // useEffect(() => {
    //     //getCategorie();
    // }, [])
    
    const table = useReactTable({
        data: categorie,
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
        <SottocategorieTable data={row.original.id_categoria} />
    )
}

const CategorieTable = () => {

    const dispatch = useAppDispatch()

    const onAddCategorie = () => {
        dispatch(setDatiCategoria( { categoria: '',
        descrizione: '',
        uuid_categoria:''
    }))
        dispatch(toggleNewCategoriaDialog(true))
    }

    return (
        <>
            <NewCategorieDialog />
            <NewSottocategoriaDialog />
            <div className='font-bold mb-4'>
                Categorie e sottocategorie

                <Button
                    size="sm"
                    icon={<HiDownload />}
                    onClick={ onAddCategorie }
                >
                    Nuova categoria
                </Button>
            </div>
            <ReactTable
                renderRowSubComponent={renderSubComponent}
                getRowCanExpand={() => true}
            />
        </>
    )
}

export default CategorieTable

