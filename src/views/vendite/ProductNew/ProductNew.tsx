import ProductForm, {
    FormModel,
    SetSubmitting,
} from '@/views/vendite/ProductForm'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { insertProdotto } from '@/services/VenditeService'

const ProductNew = () => {
    const navigate = useNavigate()

    const addProduct = async (data: FormModel) => {
        const response = await insertProdotto<boolean, FormModel>(data)
        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        const success = await addProduct(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Successfuly added'}
                    type="success"
                    duration={2500}
                >
                    Nuovo prodotto inserito
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/vendite/ProductList')
        }
    }

    const handleDiscard = () => {
        navigate('/vednite/ProductList')
    }

    return (
        <>
            <ProductForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default ProductNew
