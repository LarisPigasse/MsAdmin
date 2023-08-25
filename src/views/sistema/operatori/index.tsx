import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import OperatoriTable from './components/OperatoriTable'
import OperatoriTableTools from './components/OperatoriTableTools'
import OperatoriDeleteConfirmation from './components/OperatoriDeleteConfirmation'

injectReducer('salesOrderList', reducer)

const Operatori = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Operatori</h3>
                <OperatoriTableTools />
            </div>
            <OperatoriTable />
            <OperatoriDeleteConfirmation />
        </AdaptableCard>
    )
}

export default Operatori