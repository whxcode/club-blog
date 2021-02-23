import React,{ lazy } from 'react'
import Home from "@/views/home"
import Index from "@/views/home/index/index"
import FourZeroFour from "@/views/404"
import LazyHigher from "@/components/LazyHigher"
;
const Login = lazy(() => import(/*webpackChunkName:"views-login"*/'@/views/login'))
const Screen = lazy(() => import(/*webpackChunkName:"views-screen"*/'@/views/screen'))
const Plus = lazy(() => import(/*webpackChunkName:"views-plus"*/'@/views/home/plus/index'))
const Profile = lazy(() => import(/*webpackChunkName:"views-profile"*/'@/views/profile'))
const Story = lazy(() => import(/*webpackChunkName:"views-story"*/'@/views/story'))
const Article = lazy(() => import(/*webpackChunkName:"views-article"*/'@/views/article'))
const Setting = lazy(() => import(/*webpackChunkName:"views-setting"*/'@/views/setting'))
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
        path: '/profile',
        component: LazyHigher(Profile),
    },
    {
        path: '/story',
        component: LazyHigher(Story),
    },
    {
        path: '/article',
        component: LazyHigher(Article),
    },
    {
        path: '/setting',
        component: LazyHigher(Setting),
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