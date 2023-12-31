import ApiService from './ApiService'

export async function apiGetSistemaOperatori<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/operatori/operatori-filter',
        method: 'post',
        data,
    })
}

export async function apiDeleteSistemaOperatori<
    T,
    U extends Record<string, unknown>
>(data: U) {

    let id : any = data.id;
    id = id[0];
    return ApiService.fetchData<T>({
        url: '/operatori/operatori/'+id,
        method: 'delete'
    })
}
export async function apiGetSistemaCategorie(data : any){
    return ApiService.fetchData({
        url: '/categorie/categorie-filter',
        method: 'post',
        data
    })
}


export async function apiGetSistemaOperatore<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/sistema/operatore',
        method: 'get',
        params,
    })
}

export async function apiPutSistemaOperatori<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/sistema/operatori/update',
        method: 'put',
        data,
    })
}

export async function apiInsertOperatore<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/operatori/operatori',
        method: 'post',
        data,
    })
}

export async function apiGetCategorieFilter<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/categorie/categorie-filter',
        method: 'post',
        data,
    })
}

export async function apiInsertCategoria(data: any) {
    return ApiService.fetchData({
        url: '/categorie/',
        method: 'post',
        data,
    })
}

export async function apiInsertSottocategoria(data: any) {
    return ApiService.fetchData({
        url: '/sottocategorie/',
        method: 'post',
        data,
    })
}

export async function apiUpdateSottocategoria(data: any) {

    return ApiService.fetchData({
        url: `/sottocategorie/${data.id_categoria}/${data.id_sottocategoria}`,
        method: 'put',
        data,
    })
}

export async function apiUpdateCategoria(data: any) {

    return ApiService.fetchData({
        url: `/categorie/${data.uuid_categoria}`,
        method: 'put',
        data,
    })
}

export async function apiGetOneCategoria(data: any) {
    return ApiService.fetchData({
        url: `/categorie/${data}`,
        method: 'get',
    })
}
