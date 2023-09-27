import {
    createSlice,
    createAsyncThunk,
    current,
    PayloadAction,
} from '@reduxjs/toolkit'
import {
    apiInsertOperatore,
    apiGetSistemaOperatori,
    apiDeleteSistemaOperatori,
    apiInsertCategoria
} from '@/services/SistemaService'

import { apiGetCategorie } from '@/services/CategorieSottocategorieService';

import type { TableQueries } from '@/@types/common'

type Categoria = {
    id_categoria: string
    categoria: string
    descrizione: string
    stato: string
}

type Categorie = Categoria[]

// type GetSistemaOperatoriResponse = {
//     data: Operatori
//     total: number
// }

export type VenditeTabelleState = {
    loading: boolean
    categorie: Categorie
    tableData: TableQueries
    deleteMode: 'single' | 'batch' | ''
    selectedRows: string[]
    selectedRow: string
    newCategoriaDialog: boolean
}

export const SLICE_NAME = 'venditeTabelle'

export const getCategorie = createAsyncThunk(
    SLICE_NAME + '/getCategorie',
    async () => {
        const response = await apiGetCategorie<[]>()
        console.log(response)
        return response.data || []
    }
)

export const insertCategoria = createAsyncThunk(
    SLICE_NAME + '/insertCategoria',
    async (data : any) => {
        const response = await apiInsertCategoria(data)
        return response.data
    }
)

// export const getOperatori = createAsyncThunk(
//     SLICE_NAME + '/getOperatori',
//     async (data: TableQueries) => {
//         const response = await apiGetSistemaOperatori<
//             GetSistemaOperatoriResponse,
//             TableQueries
//         >(data)
//         return response.data
//     }
// )

// export const deleteOperatori = async (data: { id: string | string[] }) => {
  
//     const response = await apiDeleteSistemaOperatori<
//         boolean,
//         { id: string | string[] }
//     >(data)
//     return response.data
// }

// type insertOperatoreRequest = {
//     operatore: string
//     email: string
//     telefono: string
// }

// type insertOperatoreResponse = Operatori

// export const insertOperatore = createAsyncThunk(
//     SLICE_NAME + '/putProject',
//     async (data: insertOperatoreRequest) => {
//         const response = await apiInsertOperatore<
//              insertOperatoreResponse,
//              insertOperatoreRequest
//         >(data)
//         return response.data
//     }
// )

const initialState: VenditeTabelleState = {
    loading: false,
    newCategoriaDialog: false,
    categorie: [],
    tableData: {
        total: 0,
        pageIndex: 1,
        pageSize: 10,
        query: '',
        sort: {
            order: '',
            key: '',
        },
    },
    selectedRows: [],
    selectedRow: '',
    deleteMode: '',
}

const tabellaSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        // setOperatori: (state, action) => {
        //     state.operatori = action.payload
        // },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setSelectedRows: (state, action) => {
            state.selectedRows = action.payload
        },
        setSelectedRow: (state, action) => {
            state.selectedRow = action.payload
        },
        addRowItem: (state, { payload }) => {
            const currentState = current(state)
            if (!currentState.selectedRows.includes(payload)) {
                state.selectedRows = [...currentState.selectedRows, ...payload]
            }
        },
        removeRowItem: (state, { payload }: PayloadAction<string>) => {
            const currentState = current(state)
            if (currentState.selectedRows.includes(payload)) {
                state.selectedRows = currentState.selectedRows.filter(
                    (id) => id !== payload
                )
            }
        },
        setDeleteMode: (state, action) => {
            state.deleteMode = action.payload
        },
        toggleNewCategoriaDialog: (state, action) => {
            state.newCategoriaDialog = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategorie.fulfilled, (state, action) => {
                state.categorie = action.payload
                state.loading = false
            })
            .addCase(getCategorie.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    setTableData,
    setSelectedRows,
    setSelectedRow,
    addRowItem,
    removeRowItem,
    setDeleteMode,
    toggleNewCategoriaDialog,
} = tabellaSlice.actions

export default tabellaSlice.reducer
