import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'
import projectRoutes from './projectRoutes'
export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    ...projectRoutes,
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/Home')),
        authority: [],
    },
    {
        key: 'acquisti.dashboard',
        path: '/acquisti/dashboard/',
        component: lazy(() => import('@/views/acquisti/dashboard')),
        authority: [],
    }, 
    {
        key: 'acquisti.fornitori',
        path: '/acquisti/fornitori/',
        component: lazy(() => import('@/views/acquisti/fornitori')),
        authority: [],
    }, 
    {
        key: 'acquisti.magazzino',
        path: '/acquisti/magazzino/',
        component: lazy(() => import('@/views/acquisti/magazzino')),
        authority: [],
    },
    {
        key: 'acquisti.ordini',
        path: '/acquisti/ordini/',
        component: lazy(() => import('@/views/acquisti/ordini')),
        authority: [],
    }, 
    {
        key: 'crm.dashboard',
        path: '/crm/dashboard/',
        component: lazy(() => import('@/views/crm/dashboard')),
        authority: [],
    },
    {
        key: 'crm.clienti',
        path: '/crm/clienti/',
        component: lazy(() => import('@/views/crm/clienti')),
        authority: [],
    }, 
    {
        key: 'crm.comunicazioni',
        path: '/crm/comunicazioni/',
        component: lazy(() => import('@/views/crm/comunicazioni')),
        authority: [],
    },
    {
        key: 'crm.report',
        path: '/crm/report/',
        component: lazy(() => import('@/views/crm/report')),
        authority: [],
    }, 
    {
        key: 'crm.calendario',
        path: '/crm/calendario/',
        component: lazy(() => import('@/views/crm/calendario')),
        authority: [],
    },
    {
        key: 'vendite.dashboard',
        path: '/vendite/dashboard/',
        component: lazy(() => import('@/views/vendite/dashboard')),
        authority: [],
    },
    {
        key: 'vendite.listini',
        path: '/vendite/listini/',
        component: lazy(() => import('@/views/vendite/listini')),
        authority: [],
    },
    {
        key: 'vendite.ordini',
        path: '/vendite/OrderList/',
        component: lazy(() => import('@/views/vendite/OrderList')),
        authority: [],
    },
    {
        key: 'vendite.prodotti',
        path: '/vendite/ProductList/',
        component: lazy(() => import('@/views/vendite/ProductList')),
        authority: [],
    },
    {
        key: 'vendite.prodottiNew',
        path: '/vendite/product-new/',
        component: lazy(() => import('@/views/vendite/ProductNew')),
        authority: [],
    },
    {
        key: 'vendite.prodottiEdit',
        path: '/vendite/product-edit/:uuid_prodotto',
        component: lazy(() => import('@/views/vendite/ProductEdit')),
        authority: [],
    },          
    {
        key: 'vendite.tabelle',
        path: '/vendite/tabelle/',
        component: lazy(() => import('@/views/vendite/tabelle')),
        authority: [],
    },
    {
        key: 'sistema.account',
        path: '/sistema/account/',
        component: lazy(() => import('@/views/sistema/account')),
        authority: [],
    },
    {
        key: 'sistema.configurazione',
        path: '/sistema/configurazione/',
        component: lazy(() => import('@/views/sistema/configurazione')),
        authority: [],
    },
    {
        key: 'sistema.operatori',
        path: '/sistema/operatori/',
        component: lazy(() => import('@/views/sistema/operatori')),
        authority: [],
    },
    {
        key: 'sistema.tabelle',
        path: '/sistema/tabelle/',
        component: lazy(() => import('@/views/sistema/tabelle')),
        authority: [],
    },
    {
        key: 'amministrazione.dashboard',
        path: '/amministrazione/dashboard/',
        component: lazy(() => import('@/views/amministrazione/dashboard')),
        authority: [],
    },
    {
        key: 'amministrazione.documenti',
        path: '/amministrazione/documenti/',
        component: lazy(() => import('@/views/amministrazione/documenti')),
        authority: [],
    },
    {
        key: 'amministrazione.pagamenti',
        path: '/amministrazione/pagamenti/',
        component: lazy(() => import('@/views/amministrazione/pagamenti')),
        authority: [],
    },                               
]                           

