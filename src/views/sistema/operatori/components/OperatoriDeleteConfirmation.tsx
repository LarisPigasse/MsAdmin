import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    setDeleteMode,
    setSelectedRow,
    setSelectedRows,
    deleteOperatori,
    getOperatori,
    useAppDispatch,
    useAppSelector,
} from '../store'

const OperatoriDeleteConfirmation = () => {
    const dispatch = useAppDispatch()
    const selectedRows = useAppSelector(
        (state) => state.sistemaOperatori.data.selectedRows
    )
    const selectedRow = useAppSelector(
        (state) => state.sistemaOperatori.data.selectedRow
    )
    const deleteMode = useAppSelector(
        (state) => state.sistemaOperatori.data.deleteMode
    )
    const tableData = useAppSelector(
        (state) => state.sistemaOperatori.data.tableData
    )

    const onDialogClose = () => {
        dispatch(setDeleteMode(''))

        if (deleteMode === 'single') {
            dispatch(setSelectedRow([]))
        }
    }

    const onDelete = async () => {
        dispatch(setDeleteMode(''))

        if (deleteMode === 'single') {
            const success = await deleteOperatori({ id: selectedRow })
            deleteSucceed(success)
            dispatch(setSelectedRow([]))
        }

        if (deleteMode === 'batch') {
            const success = await deleteOperatori({ id: selectedRows })
            deleteSucceed(success, selectedRows.length)
            dispatch(setSelectedRows([]))
        }
    }

    const deleteSucceed = (success: boolean, operatori = 0) => {
        if (success) {
            dispatch(getOperatori(tableData))
            toast.push(
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={2500}
                >
                    {deleteMode === 'single' && 'Operatore '}
                    {deleteMode === 'batch' && `${operatori} operatori `}
                    successfuly deleted
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    return (
        <ConfirmDialog
            isOpen={deleteMode === 'single' || deleteMode === 'batch'}
            type="danger"
            title="Delete product"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>
                Sei sicuro di voler eliminare quest'operatore? Tutti i record relativi
                verranno cancellati. Quest'azione non può essere annullato.
            </p>
        </ConfirmDialog>
    )
}

export default OperatoriDeleteConfirmation
