import {
    createSlice,
    createAsyncThunk,
    current,
    PayloadAction,
} from '@reduxjs/toolkit'
import {
    apiInsertSottocategoria,
    apiUpdateSottocategoria,
    apiGetSistemaOperatori,
    apiGetOneCategoria,
    apiInsertCategoria,
    apiUpdateCategoria
} from '@/services/SistemaService'

import { apiGetCategorie, apiGetSottocategorie } from '@/services/CategorieSottocategorieService';

import type { TableQueries } from '@/@types/common'

type Categoria = {
    id_categoria: any
    uuid_categoria: any
    categoria: string
    descrizione: string
    stato: string
}

type Sottocategoria = {
    id_categoria: any
    id_sottocategoria: any
    uuid_sottocategoria: string
    sottocategoria: string
    descrizione: string
    stato: string
}

type Categorie = Categoria[]
type Sottocategorie = Sottocategoria[]

// type GetSistemaOperatoriResponse = {
//     data: Operatori
//     total: number
// }

export type VenditeTabelleState = {
    loading: boolean
    categorie: Categorie
    sottocategorie: Sottocategorie
    datiCategoria: Categoria
    datiSottocategoria: Sottocategoria
    tableData: TableQueries
    deleteMode: 'single' | 'batch' | ''
    selectedRows: string[]
    selectedRow: string
    newCategoriaDialog: boolean
    newSottocategoriaDialog: boolean
    id_categoria: number | null
}

export const SLICE_NAME = 'venditeTabelle'

export const getCategorie = createAsyncThunk(
    SLICE_NAME + '/getCategorie',
    async () => {
        const response = await apiGetCategorie<[]>()

        return response.data || []
    }
)


export const getSottocategorie = createAsyncThunk(
    SLICE_NAME + '/getSottocategorie',
    async (data : any) => {
        const response = await apiGetSottocategorie<[]>(data)

        return response.data || []
    }
)



export const insertSottocategoria = createAsyncThunk(
    SLICE_NAME + '/insertSottocategoria',
    async (data : any) => {
        const response = await apiInsertSottocategoria(data)
        return response.data
    }
)
export const updateSottocategoria = createAsyncThunk(
    SLICE_NAME + '/updateSottocategoria',
    async (data : any) => {
        const response = await apiUpdateSottocategoria(data)
        return response.data
    }
)

export const insertCategoria = createAsyncThunk(
    SLICE_NAME + '/insertCategoria',
    async (data : any) => {
        const response = await apiInsertCategoria(data)
        return response.data
    }
)
export const updateCategoria = createAsyncThunk(
    SLICE_NAME + '/updateCategoria',
    async (data : any) => {
        const response = await apiUpdateCategoria(data)
        return response.data
    }
)

export const getOneCategoria = createAsyncThunk(
    SLICE_NAME + '/getOneCategoria',
    async (id_categoria : number) => {
        const response = await apiGetOneCategoria(id_categoria)
        return response.data
    }
)

// export const getOneCategoria = async (id_categoria: number) => {
//     const response = await apiGetOneCategoria(id_categoria)
//     return await response.data;
// }

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
    newSottocategoriaDialog: false,
    categorie: [],
    sottocategorie: [],
    datiSottocategoria:{
        sottocategoria: '',
        descrizione: '',
        stato: '',
        id_categoria:null,
        id_sottocategoria:null,
        uuid_sottocategoria:''
    },
    datiCategoria: { categoria: '',
                    descrizione: '',
                    stato: '',
                    id_categoria:null,
                    uuid_categoria:''
                },
    id_categoria:null,
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
        setDatiSottocategoria: (state, action) => {
            state.datiSottocategoria = action.payload
        },
        setDatiCategoria: (state, action) => {
            state.datiCategoria = action.payload
        },
        setIdCategoria: (state, action) => {
            state.id_categoria = action.payload
        },
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
        toggleNewSottocategoriaDialog: (state, action) => {
            state.newSottocategoriaDialog = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategorie.fulfilled, (state, action) => {
                state.categorie = action.payload
                state.loading = false
            })
            .addCase(getSottocategorie.fulfilled, (state, action) => {
                state.sottocategorie = action.payload
                state.loading = false
            })
            .addCase(getCategorie.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    setTableData,
    setDatiCategoria,
    setIdCategoria,
    setSelectedRows,
    setSelectedRow,
    addRowItem,
    removeRowItem,
    setDeleteMode,
    toggleNewCategoriaDialog,
    toggleNewSottocategoriaDialog,
    setDatiSottocategoria,
} = tabellaSlice.actions

export default tabellaSlice.reducer
