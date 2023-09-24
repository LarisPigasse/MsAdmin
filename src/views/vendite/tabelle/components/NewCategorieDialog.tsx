import Dialog from '@/components/ui/Dialog'
import NewCategorieForm from './NewCategorieForm'
import {
    toggleNewCategoriaDialog,
    useAppDispatch,
    useAppSelector,
} from '../store'

const NewCategorieDialog = () => {
    const dispatch = useAppDispatch()

    const newCategoriaDialog = useAppSelector(
        (state) => state.venditeTabelle.data.newCategoriaDialog
    )

    const onDialogClose = () => {
        dispatch(toggleNewCategoriaDialog(false))
    }

    return (
        <Dialog
            isOpen={newCategoriaDialog}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <h4>Inserisce nuova categoria</h4>
            <div className="mt-4">
                <NewCategorieForm />
            </div>
        </Dialog>
    )
}

export default NewCategorieDialog
