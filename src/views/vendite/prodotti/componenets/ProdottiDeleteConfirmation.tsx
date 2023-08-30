import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleDeleteConfirmation,
    deleteProdotti,
    getProdotti,
    useAppDispatch,
    useAppSelector,
} from '../store'

const ProdottiDeleteConfirmation = () => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector(
        (state) => state.venditeProdotti.data.deleteConfirmation
    )
    const selectedProdotto = useAppSelector(
        (state) => state.venditeProdotti.data.selectedProdotto
    )
    const tableData = useAppSelector(
        (state) => state.venditeProdotti.data.tableData
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        const success = await deleteProdotti({ id: selectedProdotto })

        if (success) {
            dispatch(getProdotti(tableData))
            toast.push(
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={2500}
                >
                    Prodotto eliminato con successo
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    return (
        <ConfirmDialog
            isOpen={dialogOpen}
            type="danger"
            title="Delete product"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>
                Sei sicuro di voler eliminare questo prodotto? Tutti i record relativi
                saranno eliminati. Questa azione non può essere annullata.
            </p>
        </ConfirmDialog>
    )
}

export default ProdottiDeleteConfirmation
