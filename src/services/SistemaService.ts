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
    return ApiService.fetchData<T>({
        url: '/sistema/operatori/delete',
        method: 'delete',
        data,
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

