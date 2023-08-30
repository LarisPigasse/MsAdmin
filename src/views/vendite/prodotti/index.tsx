import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import ProdottiTable from './componenets/ProdottiTable'
import ProdottiTableTools from './componenets/ProdottiTableTools'

injectReducer('salesProductList', reducer)

const Prodotti = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Products</h3>
                <ProdottiTableTools />
            </div>
            <ProdottiTable />
        </AdaptableCard>
    )
}

export default Prodotti