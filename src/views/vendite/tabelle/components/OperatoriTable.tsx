import { useEffect, useCallback, useMemo, useRef } from 'react'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi'
import {
    setSelectedRows,
    addRowItem,
    removeRowItem,
    setDeleteMode,
    setSelectedRow,
    getOperatori,
    setTableData,
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
    Row,
} from '@/components/shared/DataTable'

type Operatore = {
    id_operatore: string
    operatore: string
    email: string
    stato: string
}

const OperatoriColumn = ({ row }: { row: Operatore }) => {
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onView = useCallback(() => {
        navigate(`/app/sales/order-details/${row.id_operatore}`)
    }, [navigate, row])

    return (
        <span
            className={`cursor-pointer select-none font-semibold hover:${textTheme}`}
            onClick={onView}
        >
            #{row.id_operatore}
        </span>
    )
}

const ActionColumn = ({ row }: { row: Operatore }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onDelete = () => {
        dispatch(setDeleteMode('single'))
        dispatch(setSelectedRow([row.id_operatore]))
    }

    const onView = useCallback(() => {
        navigate(`/app/sales/order-details/${row.id_operatore}`)
    }, [navigate, row])

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

const OperatoriTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.sistemaOperatori.data.tableData
    )
    const loading = useAppSelector((state) => state.sistemaOperatori.data.loading)

    const data = useAppSelector((state) => state.sistemaOperatori.data.operatori)

    const fetchData = useCallback(() => {
        dispatch(getOperatori({ pageIndex, pageSize, sort, query }))
    }, [dispatch, pageIndex, pageSize, sort, query])

    useEffect(() => {
        dispatch(setSelectedRows([]))
        fetchData()
    }, [dispatch, fetchData, pageIndex, pageSize, sort])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSelected()
        }
    }, [data])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const columns: ColumnDef<Operatore>[] = useMemo(
        () => [
            {
                header: 'ID',
                accessorKey: 'id',
                cell: (props) => <OperatoriColumn row={props.row.original} />,
            },
            {
                header: 'Operatore',
                accessorKey: 'operatore',
            },
            {
                header: 'Email',
                accessorKey: 'email',
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

    const onPaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    const onRowSelect = (checked: boolean, row: Operatore) => {
        if (checked) {
            dispatch(addRowItem([row.id_operatore]))
        } else {
            dispatch(removeRowItem(row.id_operatore))
        }
    }

    const onAllRowSelect = useCallback(
        (checked: boolean, rows: Row<Operatore>[]) => {
            if (checked) {
                const originalRows = rows.map((row) => row.original)
                const selectedIds: string[] = []
                originalRows.forEach((row) => {
                    selectedIds.push(row.id_operatore)
                })
                dispatch(setSelectedRows(selectedIds))
            } else {
                dispatch(setSelectedRows([]))
            }
        },
        [dispatch]
    )

    return (
        <DataTable
            ref={tableRef}
            selectable
            columns={columns}
            data={data}
            loading={loading}
            pagingData={{
                total: tableData.total as number,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            onPaginationChange={onPaginationChange}
            onSelectChange={onSelectChange}
            onSort={onSort}
            onCheckBoxChange={onRowSelect}
            onIndeterminateCheckBoxChange={onAllRowSelect}
        />
    )
}

export default OperatoriTable
