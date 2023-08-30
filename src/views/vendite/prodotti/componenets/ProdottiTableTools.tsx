import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import ProdottiTableSearch from './ProdottiTableSearch'
import ProdottiFilter from './ProdottiFilter'
import { Link } from 'react-router-dom'

const ProdottiTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <ProdottiTableSearch />
            <ProdottiFilter />
            <Link
                download
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/prodotti.csv"
                target="_blank"
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Export
                </Button>
            </Link>
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/app/vednite/Prodotti-new"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Aggiungi un prodotto
                </Button>
            </Link>
        </div>
    )
}

export default ProdottiTableTools
