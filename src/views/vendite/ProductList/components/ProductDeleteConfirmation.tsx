import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleDeleteConfirmation,
    deleteProduct,
    getProducts,
    useAppDispatch,
    useAppSelector,
} from '../store'

const ProductDeleteConfirmation = () => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector(
        (state) => state.salesProductList.data.deleteConfirmation
    )
    const selectedProduct = useAppSelector(
        (state) => state.salesProductList.data.selectedProduct
    )
    const tableData = useAppSelector(
        (state) => state.salesProductList.data.tableData
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        const success = await deleteProduct({ id: selectedProduct })

        if (success) {
            dispatch(getProducts(tableData))
            toast.push(
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={2500}
                >
                    Prodotto eliminato
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
            title="Elimina il prodotto"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>
                Sei sicuro di voler eliminare questo prodotto? Anche tutti i record relativi
                saranno eliminati. Questa azione non può essere annullata.
            </p>
        </ConfirmDialog>
    )
}

export default ProductDeleteConfirmation
