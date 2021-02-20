import React from "react"
import {NavLink, useLocation} from "react-router-dom";
import {useHistory} from "react-router";

const Navigator = () => {
    const { pathname } = useLocation()
    const { goBack } = useHistory()
    return <section className="home-navigator">
        <NavLink className="path" to='/home/index' activeClassName="_active">
            <span className="icon iconfont iconhome"></span>
            <p className="icon">Home</p>
        </NavLink>
        <NavLink className="path" to='/home/new'  activeClassName="_active">
            <div className="add" onClick={() => {
                if(pathname === '/home/new') {
                    goBack()
                }
            }}>
                <div className="plus">
                    <span className="icon iconfont iconi-add "></span>
                </div>
            </div>
        </NavLink>
        <NavLink className="path" to='/home/articles'  activeClassName="_active">
            <span className="icon iconfont iconbook"></span>
            <p className="icon">Article</p>
        </NavLink>
    </section>
}
export default Navigator