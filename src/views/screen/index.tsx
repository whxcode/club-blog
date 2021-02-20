import React, {useEffect, useState} from 'react'
import {useHistory} from "react-router";
import './index.less'
const Screen = () => {
    const { push } = useHistory()
    const [opacity,setOpacity] = useState(10)
    useEffect(() => {
        setTimeout(() => {
            push('/home')
        },2000)
    })
    useEffect(() => {
        setTimeout(() => {
            setOpacity(0)
        })

        return () => {

        }
    })
    return <div className="views-screen" style={{ opacity: opacity / 10 }}>
        <img src={ require('@/asserts/images/first-page.png') } alt=""/>
    </div>
}
export default Screen