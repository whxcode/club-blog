import React,{ lazy } from 'react'
import Home from "@/views/home"
import Index from "@/views/home/index/index"
import FourZeroFour from "@/views/404"
import LazyHigher from "@/components/LazyHigher"
const Login = lazy(() => import(/*webpackChunkName:"views-login"*/'@/views/login'))
const Screen = lazy(() => import(/*webpackChunkName:"views-screen"*/'@/views/screen'))
const Plus = lazy(() => import(/*webpackChunkName:"views-plus"*/'../views/home/plus/index'))
export interface RouterI {
    path?: string,
    meta?: any,
    component?: any,
    title?: string,
    redirect?: string
    routes?: Array<RouterI>
    [key : string]: any
}
const routes: Array<RouterI> = [
    {
        path: '/screen',
        component: LazyHigher(Screen),
    },
    {
        path: '/home',
        component: Home,
        routes: [
            {
                path:'/home/index',
                component: Index
            },
            {
                path:'/home/new',
                component: LazyHigher(Plus)
            },
            {
                path:'/home/articles',
                component: LazyHigher(lazy(() => import(/*webpackChunkName:"views-articles"*/'../views/home/articles')))
            },
            {
                redirect: '/home/index'
            }
        ]
    },
    {
        path: '/login',
        component: LazyHigher(Login),
    },
    {
        path: '/404',
        component: FourZeroFour
    },
    {
        redirect: '/screen'
    }
]
export default routes