import ApiService from './ApiService'

export async function apiGetCategorie<T>() {
    return ApiService.fetchData<T>({
        url: '/categorie',
        method: 'get',
    })
}

export async function apiGetSottocategorie(id : string ) {
    return ApiService.fetchData({
        url: `/sottocategorie/${id}`,
        method: 'get',
    })
}
export async function apiGetSottocategorie2<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/sales/product',
        method: 'get',
        params,
    })
}
