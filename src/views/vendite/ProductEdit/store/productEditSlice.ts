import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    getProdotti,
    apiPutSalesProduct,
    apiDeleteSalesProducts,
} from '@/services/VenditeService'

type ProductData = {
    uuid_prodotto?: string,
    prodotto?: string,
    descrizione?: string,
    scheda?: string,
    tipo?: string,
    tags?: string,
    codice?: number,
    sku?: number,
    id_categoria?: number,
    id_sottocategoria?: number,
    id_produttore?: number,
    id_aliquota?: number,
    stato?: string
}

export type SalesProductEditState = {
    loading: boolean
    productData: ProductData
}

type GetSalesProductResponse = ProductData

export const SLICE_NAME = 'salesProductEdit'

export const getProduct = createAsyncThunk(
    SLICE_NAME + '/getProducts',
    async (data: { id: string }) => {
        const response = await getProdotti<
            GetSalesProductResponse,
            { id: string }
        >(data)
        return response.data
    }
)

export const updateProduct = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiPutSalesProduct<T, U>(data)
    return response.data
}

export const deleteProduct = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiDeleteSalesProducts<T, U>(data)
    return response.data
}

const initialState: SalesProductEditState = {
    loading: true,
    productData: {},
}

const productEditSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProduct.fulfilled, (state, action) => {
                state.productData = action.payload
                state.loading = false
            })
            .addCase(getProduct.pending, (state) => {
                state.loading = true
            })
    },
})

export default productEditSlice.reducer
