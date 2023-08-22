import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE
} from '@/constants/navigation.constant'
import type { NavigationTree } from '@/@types/navigation'

const navigationConfig = [
    {
        key: 'home',
        path: '/home',
        title: 'Home',
        translateKey: 'nav.home',
        icon: 'home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'attivita',
        path: '',
        title: 'Attività',
        translateKey: 'nav.attivita',
        icon: 'monitor',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'attivita.dashboard',
                path: '/attivita-dashboard',
                title: 'Dashboard',
                translateKey: 'nav.attivita.dashboard',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },            
            {
                key: 'attivita.crm',
                path: '/attivita-crm',
                title: 'CRM',
                translateKey: 'nav.attivita.crm',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },            
            {
                key: 'attivita.comunicazioni',
                path: '/attivita-comunicazioni',
                title: 'Comunicazioni',
                translateKey: 'nav.attivita.comunicazioni',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },                        
            {
                key: 'attivita.calendario',
                path: '/attivita-calendario',
                title: 'Calendario',
                translateKey: 'nav.attivita.calendario',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
        ],
    },                
    {
        key: 'vendite',
        path: '',
        title: 'Gestione vendite',
        translateKey: 'nav.vendite.vendite',
        icon: 'cart',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'vendite.dashboard',
                path: '/vendite-dashboard',
                title: 'Dashboard',
                translateKey: 'nav.vendite.dashboard',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },            
            {
                key: 'vendite.ordini',
                path: '/vendite-ordini',
                title: 'Ordini',
                translateKey: 'nav.vendite.ordini',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },            
            {
                key: 'vendite.listini',
                path: '/vendite-listini',
                title: 'Listini',
                translateKey: 'nav.vendite.listini',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },                        
            {
                key: 'vendite.prodotti',
                path: '/vendite-prodotti',
                title: 'Prodotti e Categorie',
                translateKey: 'nav.vendite.item1',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
        ],
    },
    {
        key: 'acquisti',
        path: '',
        title: 'Gestione acquisti',
        translateKey: 'nav.acquisti.acquisti',
        icon: 'collapseMenu',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'acquisti.dashboard',
                path: '/acquisti-dashboard',
                title: 'Dashboard',
                translateKey: 'nav.acquisti.dashboard',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },            
            {
                key: 'acquisti.ordini',
                path: '/acquisti-ordini',
                title: 'Ordini di acquisto',
                translateKey: 'nav.acquisti.ordini',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },            
        ],
    }, 
    {
        key: 'amministrazione',
        path: '',
        title: 'Amministrazione',
        translateKey: 'nav.amministrazione.amministrazione',
        icon: 'admin',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'amministrazione.dashboard',
                path: '/amministrazione-dashboard',
                title: 'Dashboard',
                translateKey: 'nav.amministrazione.dashboard',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },             
            {
                key: 'amministrazione.documenti',
                path: '/amministrazione-documenti',
                title: 'Fatture e Documenti',
                translateKey: 'nav.amministrazione.documenti',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'amministrazione.pagamenti',
                path: '/amministrazione-pagamenti',
                title: 'Pagamenti',
                translateKey: 'nav.amministrazione.pagamenti',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },            
        ],
    },    
    {
        key: 'clienti.fornitori',
        path: '/clienti-fornitori',
        title: 'Clienti e Foritori',
        translateKey: 'nav.clienti.fornitori',
        icon: 'singleMenu',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },    
    {
        key: 'sistema',
        path: '',
        title: 'SISTEMA',
        translateKey: 'SISTEMA e SETUP',
        icon: '',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [],
        subMenu: [
            {
                key: 'configurazione',
                path: '/configurazione',
                title: 'Configurazione',
                translateKey: 'nav.sistema.configurazione',
                icon: 'setup',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'account',
                path: '/account',
                title: 'Account',
                translateKey: 'nav.sistema.account',
                icon: 'account',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'operatori',
                path: '/operatori',
                title: 'Operatori',
                translateKey: 'nav.sistema.operatori',
                icon: 'user',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'report.statistiche',
                path: '/report-statistiche',
                title: 'Report e Statistiche',
                translateKey: 'nav.report.statistiche',
                icon: 'stat',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },                                     
            {
                key: 'tabelle',
                path: '/tabelle',
                title: 'Tabelle di base',
                translateKey: 'nav.tabelle',
                icon: 'opzioni',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },  
        ],
    },
]

export default navigationConfig
