import React from 'react'
import {  Route, Switch,Redirect } from 'react-router-dom'
import routes from "./router"
import { RouterI } from "./router"
import { Store } from '@/utils/index'
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
                    const user = Store.get('userInfo')
                    if(!user && !whiteNames.includes(item.path)) {
                        return <Redirect to={ '/login' }/>
                    }
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
    return <article className="routers">
        {  <RouterMaps routes={ routes } />  }
    </article>
}