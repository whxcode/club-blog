import React, {memo, useCallback, useMemo, useReducer, useRef, useState} from 'react'
import cn from 'classnames'
import './index.less'
import {useHistory} from "react-router"
function createDownloadFile(file: File) {
    var blob = new Blob([file]);
    return URL.createObjectURL(blob);
}
function formReducer(state: any,action: any) {
    const newState = { ...state }
    newState[action.type] = action.data
    return newState
}
const UploadAvatar = memo((props: any) => {
    const { localFormDispatch } = props
    const avatar = useRef<HTMLInputElement | null>(null)
    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        const file = e.target.files[0]
        e.target.value = ''
        const url = createDownloadFile(file)
        setUrl(url)
        localFormDispatch({ type: 'avatar',data: file })
    },[])
    const [url,setUrl] = useState('')
    return <div className="upload-avatar">
                <div className="user-avatar-wrapper"
                     onClick={() => {
                         avatar.current!.click()
                     }}
                >
                        <div className={ cn('wrapper-img',{
                            hidden: !url
                        }) }>
                            <img src={ url } alt="" />
                        </div>

                    <input type="file" className="hidden" ref={ avatar }
                        onChange={ onChange }
                    />
                </div>
                <p className="note">please,update</p>
        </div>
})

const Setting = memo(() => {
    const { goBack } = useHistory()
    const [localForm,localFormDispatch] = useReducer(formReducer,{
        name: '',
        email: '',
        avatar: null,
        brief: ''
    },() => {
        return {
            name: '',
            email: '',
            avatar: null,
            brief: ''
        }
    })
    const onInputChange =  useCallback(function onInputChange(e: React.ChangeEvent) {
        // @ts-ignore
        const { name,value } = e.target
        localFormDispatch({ type:name,data: value })

    },[])
    const disabledSave = useMemo(() => {
        return !Object.keys(localForm).every(key => localForm[key])
    },[localForm])
    const [saveLoading,setSaveLoading] = useState(false)

    const onSave = useCallback(() => {
        setSaveLoading(true)
        setTimeout(() => {
            setSaveLoading(false)
        },1000)
    },[])

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
                    <UploadAvatar localFormDispatch={ localFormDispatch }/>
                </div>

                <div className="form-item user-name">
                    <label htmlFor="">name</label>
                    <input type="text" name="name" placeholder="please,enter name" onChange={ onInputChange }/>
                </div>
                <div className="form-item">
                    <label htmlFor="">email</label>
                    <input type="text" name="email" placeholder="please,enter email" onChange={ onInputChange }/>
                </div>
                <div className="form-item about-me">
                    <h2 className="label">About me</h2>
                    <textarea className="brief" name="brief" id="about" placeholder="some..." onChange={ onInputChange }/>
                </div>
                <div className="vocations hidden">
                    <h2 className="label">vocations</h2>
                    <div className="jobs">

                    </div>
                </div>
                <div className="form-item save">
                    <button type="button"
                            disabled={ disabledSave }
                            className={ cn({
                                'disabled': disabledSave || saveLoading
                            }) }
                            onClick={ onSave }
                        >

                        {  saveLoading ?
                            <span className="save-loading iconfont " >loading</span> :
                            <span>Save</span> }
                    </button>
                </div>
            </form>
        </section>
    </article>
})
export default Setting