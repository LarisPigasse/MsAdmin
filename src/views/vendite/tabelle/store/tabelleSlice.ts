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
    apiGetSistemaCategorie
} from '@/services/SistemaService'
import type { TableQueries } from '@/@types/common'

type Operatore = {
    id: string
    operatore: string
    email: string
    stato: string
}

type Categoria = {
    id_categoria: string
    categoria: string
    descrizione: string
    stato: string
}

type Operatori = Operatore[]
type Categorie = Categoria[]

type GetSistemaOperatoriResponse = {
    data: Operatori
    total: number
}

export type SistemaTabelleState = {
    loading: boolean
    operatori: Operatori
    categorie: Categorie
    tableData: TableQueries
    tableDataCategorie: TableQueries
    deleteMode: 'single' | 'batch' | ''
    selectedRows: string[]
    selectedRow: string
    newOperatoriDialog: boolean
}

export const SLICE_NAME = 'sistemaTabelle'

export const getCategorie = createAsyncThunk(
    SLICE_NAME + '/getCategorie',
    async (data: TableQueries) => {
        const response = await apiGetSistemaCategorie(data)
        console.log(response)
        return response.data
    }
)

export const getOperatori = createAsyncThunk(
    SLICE_NAME + '/getOperatori',
    async (data: TableQueries) => {
        const response = await apiGetSistemaOperatori<
            GetSistemaOperatoriResponse,
            TableQueries
        >(data)
        return response.data
    }
)

export const deleteOperatori = async (data: { id: string | string[] }) => {
  
    const response = await apiDeleteSistemaOperatori<
        boolean,
        { id: string | string[] }
    >(data)
    return response.data
}

type insertOperatoreRequest = {
    operatore: string
    email: string
    telefono: string
}

type insertOperatoreResponse = Operatori

export const insertOperatore = createAsyncThunk(
    SLICE_NAME + '/putProject',
    async (data: insertOperatoreRequest) => {
        const response = await apiInsertOperatore<
             insertOperatoreResponse,
             insertOperatoreRequest
        >(data)
        return response.data
    }
)

const initialState: SistemaTabelleState = {
    loading: false,
    newOperatoriDialog: false,
    operatori: [],
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
    tableDataCategorie: {
        total: 0,
        pageIndex: 1,
        pageSize: 10,
        query: '',
        sort: {
            order: '',
            key: '',
        }
    },
    selectedRows: [],
    selectedRow: '',
    deleteMode: '',
}

const tabellaSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setOperatori: (state, action) => {
            state.operatori = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setTableDataCategorie: (state, action) => {
            state.tableDataCategorie = action.payload
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
        toggleNewOperatoriDialog: (state, action) => {
            state.newOperatoriDialog = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOperatori.fulfilled, (state, action) => {
                state.operatori = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getOperatori.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    setOperatori,
    setTableData,
    setTableDataCategorie,
    setSelectedRows,
    setSelectedRow,
    addRowItem,
    removeRowItem,
    setDeleteMode,
    toggleNewOperatoriDialog,
} = tabellaSlice.actions

export default tabellaSlice.reducer
