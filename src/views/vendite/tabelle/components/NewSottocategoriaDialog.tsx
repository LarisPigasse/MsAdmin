import Dialog from '@/components/ui/Dialog'
import NewSottocategoriaForm from './NewSottocategoriaForm'
import {
    toggleNewSottocategoriaDialog,
    useAppDispatch,
    useAppSelector,
} from '../store'

const NewCategorieDialog = () => {
    const dispatch = useAppDispatch()

    const newSottocategoriaDialog = useAppSelector(
        (state) => state.venditeTabelle.data.newSottocategoriaDialog
    )

    const onDialogClose = () => {
        dispatch(toggleNewSottocategoriaDialog(false))
    }

    return (
        <Dialog
            isOpen={newSottocategoriaDialog}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <h4>Inserisce nuova sottocategoria</h4>
            <div className="mt-4">
                <NewSottocategoriaForm />
            </div>
        </Dialog>
    )
}

export default NewCategorieDialog
