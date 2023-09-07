import Dialog from '@/components/ui/Dialog'
import NewOperatoriForm from './NewOperatoriForm'
import {
    toggleNewOperatoriDialog,
    useAppDispatch,
    useAppSelector,
} from '../store'

const NewProjectDialog = () => {
    const dispatch = useAppDispatch()

    const newProjectDialog = useAppSelector(
        (state) => state.sistemaOperatori.data.newOperatoriDialog
    )

    const onDialogClose = () => {
        dispatch(toggleNewOperatoriDialog(false))
    }

    return (
        <Dialog
            isOpen={newProjectDialog}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <h4>Add new project</h4>
            <div className="mt-4">
                <NewOperatoriForm />
            </div>
        </Dialog>
    )
}

export default NewProjectDialog
