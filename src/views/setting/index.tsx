import React, {memo} from 'react'
import './index.less'
import {useHistory} from "react-router";
const Setting = memo(() => {
    const { goBack } = useHistory()
    return <article className="views-settings">
        <header className="top">
            <h1 className="title">Setting</h1>
            <h1 className="more">
                <span className="iconfont iconclose" onClick={ () => {
                    goBack()
                } }/>
            </h1>
        </header>
        <section className="content">
            <form className="edit-form">
                <div className="form-item user-avatar">
                    <div className="user-avatar-wrapper">
                        <img src="" alt="" />
                    </div>
                </div>

                <div className="form-item user-name">
                    <label htmlFor="">name</label>
                    <input type="text" name="name" placeholder="please,enter name"/>
                </div>
                <div className="form-item">
                    <label htmlFor="">email</label>
                    <input type="text" name="email" placeholder="please,enter email"/>
                </div>
                <div className="form-item about-me">
                    <h2 className="label">About me</h2>
                    <textarea className="brief" name="about" id="about" placeholder="some..." />
                </div>
                <div className="vocations">
                    <h2 className="label">vocations</h2>
                    <div className="jobs">

                    </div>
                </div>
                <div className="form-item save">
                    <button type="button">Save</button>
                </div>
            </form>
        </section>
    </article>
})
export default Setting