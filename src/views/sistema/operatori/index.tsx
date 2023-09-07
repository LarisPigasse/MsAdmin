import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import OperatoriTable from './components/OperatoriTable'
import OperatoriTableTools from './components/OperatoriTableTools'
import OperatoriDeleteConfirmation from './components/OperatoriDeleteConfirmation'
import NewOperatoriDialog from './components/NewOperatoriDialog'

injectReducer('sistemaOperatori', reducer)

const Operatori = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Operatori</h3>
                <OperatoriTableTools />
            </div>
            <OperatoriTable /> 
            <OperatoriDeleteConfirmation />
            <NewOperatoriDialog />
        </AdaptableCard>
    )
}

export default Operatori