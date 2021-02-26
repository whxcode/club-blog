import React from 'react'
import {  Route, Switch,Redirect } from 'react-router-dom'
import routes from "./router"
import { RouterI } from "./router"
import { Store } from '@/utils/index'
import { setUserData } from "@/store/user/actions"
import { useDispatch } from "react-redux";
import './App.less'
const whiteNames: any = ['/login','/screen']

const RouterMaps = ({ routes }: any) => {
    return <Switch>
        {
            routes.map((item: RouterI) => {
                return <Route path={ item.path } key={ item.path || item.redirect } render={() => {
                    const { component: Component,redirect } = item
                    if(redirect) {
                        return <Redirect to={ redirect }/>
                    }
                    // const user = Store.get('userInfo')
                    // if(!user && !whiteNames.includes(item.path)) {
                       //  return <Redirect to={ '/login' }/>
                    // }
                    // @ts-ignore
                    return <Component { ...{ routes: item.routes } }>
                        { item.routes && <RouterMaps routes={ item.routes }/> }
                    </Component>
                }
                }/>
            })
        }

    </Switch>
}
export default () => {
    const user = Store.get('user')
    if(user) {
        const dispatch = useDispatch()
        dispatch(setUserData(user))
    }
    return <article className="routers">
        {  <RouterMaps routes={ routes } />  }
    </article>
}
