import { useEffect, useMemo, useRef } from 'react'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { FiPackage } from 'react-icons/fi'
import {
    getCategorie,
    setTableDataCategorie,
    useAppDispatch,
    useAppSelector,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'

import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
} from '@/components/shared/DataTable'

type Categorie = {
    id_categoria: string
    categoria: string
    descrizione: string
    stato: string
}


const ActionColumn = ({ row }: { row: Categorie }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/vendite/product-edit/${row.id_categoria}`)
    }

    const onDelete = () => {
    //     dispatch(toggleDeleteConfirmation(true))
    //     dispatch(setSelectedProduct(row.uuid_prodotto))
    }

    return (
        <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onEdit}
            >
                <HiOutlinePencil />
            </span>
            <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={onDelete}
            >
                <HiOutlineTrash />
            </span>
        </div>
    )
}

const CategoriaColumn = ({ row }: { row: Categorie }) => {
    // row.img
    // const avatar = row.uuid_prodotto ? (
    //     <Avatar src={row.uuid_prodotto} />
    // ) : (
    //     <Avatar icon={<FiPackage />} />
    // )

    return (
        <div className="flex items-center">
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.categoria}</span>
        </div>
    )
}

const CategoriaTest = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.sistemaTabelle.data.tableData
    )

    const loading = useAppSelector(
        (state) => state.sistemaTabelle.data.loading
    )

    const data = useAppSelector(
        (state) => state.sistemaTabelle.data.categorie
    )

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, sort])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSorting()
        }
    }, [])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const fetchData = () => {
        dispatch(getCategorie({ pageIndex, pageSize, sort, query, total }))
    }

    const columns: ColumnDef<Categorie>[] = useMemo(
        () => [
            {
                header: 'Prodotto',
                accessorKey: 'prodotto',
                cell: (props) => {
                    const row = props.row.original
                    return <CategoriaColumn row={row} />
                },
            },
            {
                header: 'descrizione',
                accessorKey: 'descrizione',
                cell: (props) => {
                    const row = props.row.original
                    return <CategoriaColumn row={row} />
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        []
    )

    const onPaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableDataCategorie(newTableData))
    }

    const onSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableDataCategorie(newTableData))
    }

    const onSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableDataCategorie(newTableData))
    }

    return (
        <>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={loading}
                pagingData={{
                    total: tableData.total as number,
                    pageIndex: tableData.pageIndex as number,
                    pageSize: tableData.pageSize as number,
                }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
            {/* <ProductDeleteConfirmation /> */}
        </>
    )
}

export default CategoriaTest
