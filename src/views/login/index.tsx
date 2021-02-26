import React, {memo, useCallback, useMemo, useState} from "react"
import { connect } from "react-redux"
import {regexp, Store} from '@/utils/index'
import { IReducer } from "@/store/store"
import Image from "@/components/Image"
import {
    login,
    setUserData
} from '@/store/user/actions'
import './index.less'
import cn from "classnames"
import {useHistory} from "react-router";


const concealMaps: { [key: number]: string } = {
    0: 'password',
    1: 'text'
}
type concealType = 0 | 1

interface Former{
    onLogin: (param: any) => void
}
interface LoginProper extends Former {
    dispatch: (action: any) => void
}
const Form = memo((props: Former) => {
    const { onLogin } = props
    const { push } = useHistory()
    const [conceal,setConceal] = useState<concealType>(0)
    const [name,setName] = useState<any>('')
    const [password,setPassword] = useState<any>('')
    const [noteName,setNoteName] = useState('')
    const [notePwd,setNotePwd] = useState('')
    const [loading,setLoading] = useState(false)
    const isSubmit = useMemo(() => {
        return !noteName && !notePwd && !!name && !!password
    },[noteName,notePwd,name,password])
    async function onSubmit() {
        if(loading) {
            return;
        }
        if(!isSubmit) {
            !name && setNoteName('请输入账号')
            !password && setNotePwd('请输入密码')
            return
        }
        const userInfo = {
            username: name,
            password,
        }
        setLoading(true)

        const realData: any = await onLogin(userInfo)
        setLoading(false)
        if(!realData.code) {
            push('/')
            return
        }
    }
    return  <section className="form">
        <div className="notice">
            <h1 className="text">Welcome back</h1>
            <p className="brief">Sign in with your account</p>
        </div>

        <div className="item user border-bottom">
            <label htmlFor="username"   className="username label">Username</label>
            <input type="text"  id="username" name="username" placeholder="enter username,please."
                    onChange={(e) => {
                        const value = e.target.value.trim()
                        if(!regexp.mobile(value)) {
                            setNoteName('请输入合法的账号 11位数字')
                            // setNoteName('enter one to eleven range digital,please.')
                        } else {
                            setNoteName('')
                        }
                        !value && setNoteName('')
                        setName(value)
                    }}
                />
            <p className="note">{ noteName }</p>
        </div>

        <div className="item pass border-bottom margin-top-twenty">
            <label htmlFor="Password" className="password label">Password</label>
            <input  type={ concealMaps[conceal] } name="password"
                   id="password" placeholder="enter password,please."
                    onChange={(e) => {
                        const value = e.target.value.trim()
                        if(value.length <= 5 || value.length >= 10) {
                            setNotePwd('请输入合法密码长度为 6 ~ 10')
                        } else {
                            setNotePwd('')
                        }
                        !value && setNotePwd('')
                        setPassword(value)
                    }}
            />
            <span className="conceal" onClick={() => { setConceal(conceal ? 0 : 1) }}>Show</span>
            <p className="note">{ notePwd }</p>
        </div>

        <div className="item submit">
            <button type="submit" className={ cn('button',{
                loading: loading,
            }) } onClick={ onSubmit }>
                { loading ? <span className="rotate" style={{ display: 'inline-block' }}>
                        <i className="iconfont iconloading"></i>
                </span> : <span>LOGIN</span> }
            </button>
        </div>
    </section>
})


const OthersLogin = memo((props: any) => {
    const onClick = useCallback(() => {
        alert('warning.')
    },[])

    return  <div className="others">

        <div className='rect facebook' onClick={ onClick }>
            <Image   src={  require('@/asserts/images/facebook.svg') }/>
        </div>
        <div className='rect  margin-space-thirty-two' onClick={ onClick }>
            <Image  src={  require('@/asserts/images/Google.svg') }/>
        </div>
        <div className='rect dusk' onClick={ onClick }>
            <Image   src={  require('@/asserts/images/twitter.svg') }/>
        </div>
    </div>
})

const Login = (props: LoginProper) => {
    const { onLogin } = props
    return <article className='views-login'>
            <h1 className='title'>
                <strong className='club'>Club</strong>
                <strong className='blog'>Blog</strong>
            </h1>
            <section className="welcome">
                <h2 className="text">Welcome</h2>
            </section>
            <Form onLogin={ onLogin }/>
            <footer className="other">
                <p className="forget">forget your password? <span className="reset">Reset here</span></p>
                <p className="other-method">
                    OR SIGN IN WITH
                </p>
                <OthersLogin />
            </footer>
    </article>
}
export default connect(({ user }:IReducer) => {
    return {  }
},dispatch => {
    return {
        dispatch,
        async onLogin(param: any) {
            const user = Store.get('user')
            if(user) {
                dispatch(setUserData(user))
                return {
                    ...user,
                    code: 0
                }
            }
            const data = await login(param)
            if(data.code !== 0) {
                return data
            }
            dispatch(setUserData(data.data))
            Store.set('user',data.data)
            return data
        }
    }
})(Login)
