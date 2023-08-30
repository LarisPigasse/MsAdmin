import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetVenditeProdotti,
    apiDeleteVenditeProdotti,
} from '@/services/VenditeService'
import type { TableQueries } from '@/@types/common'

type Prodotto = {
    id: string
    name: string
    productCode: string
    img: string
    category: string
    price: number
    stock: number
    status: number
}

type Prodotti = Prodotto[]

type GetVenditeProdottiResponse = {
    data: Prodotti
    total: number
}

type FilterQueries = {
    name: string
    category: string[]
    status: number[]
    productStatus: number
}

export type VenditeProdottiState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedProdotto: string
    tableData: TableQueries
    filterData: FilterQueries
    prodotti: Prodotto[]
}

type GetVenditeProdottiRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'venditeProdotti'

export const getProdotti = createAsyncThunk(
    SLICE_NAME + '/getProdotti',
    async (data: GetVenditeProdottiRequest) => {
        const response = await apiGetVenditeProdotti<
            GetVenditeProdottiResponse,
            GetVenditeProdottiRequest
        >(data)
        return response.data
    }
)

export const deleteProdotti = async (data: { id: string | string[] }) => {
    const response = await apiDeleteVenditeProdotti<
        boolean,
        { id: string | string[] }
    >(data)
    return response.data
}

export const initialTableData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

const initialState: VenditeProdottiState = {
    loading: false,
    deleteConfirmation: false,
    selectedProdotto: '',
    prodotti: [],
    tableData: initialTableData,
    filterData: {
        name: '',
        category: ['bags', 'cloths', 'devices', 'shoes', 'watches'],
        status: [0, 1, 2],
        productStatus: 0,
    },
}

const prodottiSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateProdotti: (state, action) => {
            state.prodotti = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        setSelectedProdotto: (state, action) => {
            state.selectedProdotto = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProdotti.fulfilled, (state, action) => {
                state.prodotti = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getProdotti.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    updateProdotti,
    setTableData,
    setFilterData,
    toggleDeleteConfirmation,
    setSelectedProdotto,
} = prodottiSlice.actions

export default prodottiSlice.reducer
