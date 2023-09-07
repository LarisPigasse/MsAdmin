import { lazy } from 'react'
import { APP_PREFIX_PATH } from '@/constants/route.constant'
import type { Routes } from '@/@types/routes'

const projectRoutes: Routes = [
    {
        key: 'appsProject.dashboard',
        path: `/project/dashboard`,
        component: lazy(() => import('@/views/project/ProjectDashboard')),
        authority: [],
    },
    {
        key: 'appsProject.projectList',
        path: `/project/project-list`,
        component: lazy(() => import('@/views/project/ProjectList')),
        authority: [],
    },
    {
        key: 'appsProject.scrumBoard',
        path: `/project/scrum-board`,
        component: lazy(() => import('@/views/project/ScrumBoard')),
        authority: [],
        meta: {
            pageContainerType: 'gutterless',
        },
    },
    {
        key: 'appsProject.issue',
        path: `/project/issue`,
        component: lazy(() => import('@/views/project/Issue')),
        authority: [],
    }
]

export default projectRoutes
