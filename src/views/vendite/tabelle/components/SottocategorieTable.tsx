
import { useMemo, Fragment, useEffect, useState } from 'react'
import Table from '@/components/ui/Table'
import {
    useReactTable,
    getCoreRowModel,
    getExpandedRowModel,
    flexRender,
} from '@tanstack/react-table'

import { apiGetSottocategorie } from '@/services/CategorieSottocategorieService';

import { HiOutlineChevronRight, HiOutlineChevronDown } from 'react-icons/hi'
import type { ColumnDef, Row } from '@tanstack/react-table'
import type { ReactElement } from 'react'

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

type Categoria = {
    id_categoria: number
    categoria: string
    descrizione: string
    stato: string
    subRows?: Sottocategoria[]
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

const SottocategorieTable = (data: any) => {

    const [sottocategorie, setSottocategorie] = useState([])

    // const getSottocategorie = async () => {
    //     let a = await apiGetSottocategorie();
    //     let res : any = await a.data;
    //     console.log(res)
    //     setSottocategorie(res);
    // }

    const getSottocategorie = async (data : any) => {        
        const response = await apiGetSottocategorie(data.data)
        let responseData :any = response.data;
        setSottocategorie(responseData);
        return 
    }

    useEffect(() => {
     
       getSottocategorie(data)
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

