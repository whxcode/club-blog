import React, {ChangeEvent, MutableRefObject, useCallback, useRef, useState} from "react"
import {useHistory} from "react-router"
import { Store } from '@/utils/index'
import './index.less'
const concealMaps: { [key: number]: string } = {
    0: 'password',
    1: 'text'
}
type concealType = 0 | 1
const Login = () => {
    const [conceal,setConceal] = useState<concealType>(0)
    const { push } = useHistory()
    const userName = useRef<any>()
    const password = useRef<any>()
    return <article className='views-login'>
            <h1 className='title'>
                <strong className='club'>Club</strong>
                <strong className='blog'>Blog</strong>
            </h1>
            <section className="welcome">
                <h2 className="text">Welcome</h2>
            </section>
            <section className="form">
                <div className="notice">
                    <h1 className="text">Welcome back</h1>
                    <p className="brief">Sign in with your account</p>
                </div>
                <div className="item user border-bottom">
                    <label htmlFor="username"   className="username label">Username</label>
                    <input type="text" ref={ userName } id="username" name="username" placeholder="enter username,please." />
                </div>
                <div className="item pass border-bottom margin-top-twenty">
                    <label htmlFor="Password" className="password label">Password</label>
                    <input ref={ password } type={ concealMaps[conceal] } name="password" id="password" placeholder="enter password,please." />
                    <span className="conceal" onClick={() => { setConceal(conceal ? 0 : 1) }}>Show</span>
                </div>
                <div className="item submit">
                    <button type="submit" className="button" onClick={() => {
                        const userInfo = {
                            username: userName.current.value,
                            password: password.current.value
                        }
                        Store.set('userInfo',userInfo)
                        console.log(userInfo)
                        push('/home')
                    }}>LOGIN</button>
                </div>
            </section>
            <footer className="other">
                <p className="forget">forget your password? <a href="#" className="reset">Reset here</a></p>
                <p className="other-method">
                    OR SIGN IN WITH
                </p>
                <div className="others">
                    <div className='rect '>
                        <img className="google" src={ require('@/asserts/images/Google.svg') } alt=""/>
                    </div>
                    <div className='rect facebook margin-space-thirty-two'>
                        <img src={ require('@/asserts/images/facebook.svg') } alt=""/>
                    </div>
                    <div className='rect dusk'>
                        <img src={ require('@/asserts/images/twitter.svg') } alt=""/>
                    </div>
                </div>
            </footer>
    </article>
}
export default Login