import ApiService from './ApiService'

export async function apiGetVenditeDashboard<
    T extends Record<string, unknown>
>() {
    return ApiService.fetchData<T>({
        url: '/vendite/dashboard',
        method: 'post',
    })
}

export async function apiGetVenditeProdotti<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/vendite/prodotti',
        method: 'post',
        data,
    })
}

export async function apiDeleteVenditeProdotti<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/vendite/prodotti/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetVenditeProdottiOne<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/vendite/products/one',
        method: 'get',
        params,
    })
}

export async function apiPutVenditeProdotti<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/vendite/prodotti/update',
        method: 'put',
        data,
    })
}

export async function apiCreateVenditeProdotti<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/vendite/prodotti/create',
        method: 'post',
        data,
    })
}

export async function apiGetVenditeOrdini<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/vendite/ordini',
        method: 'get',
        params,
    })
}

export async function apiDeleteVenditeOrdini<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/vendite/ordini/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetVenditeOrdiniDetails<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/vendite/ordini-details',
        method: 'get',
        params,
    })
}
