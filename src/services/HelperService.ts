import ApiService from './ApiService'

export async function apiGetAliquote() {
    return ApiService.fetchData({
        url: `/aliquote/`,
        method: 'get',
    })
}
export async function apiGetProduttori() {
    return ApiService.fetchData({
        url: `/produttori/`,
        method: 'get',
    })
}