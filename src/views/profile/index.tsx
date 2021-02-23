import React, {memo, MutableRefObject, useCallback, useEffect, useRef, RefObject, useState} from 'react'
import Avatar from "@/components/Avatar"
import './index.less'
import ArticleItem from "@/components/ArctileIem";
import {useHistory} from "react-router";
import cn from "classnames";
interface DiscoverProper {
    discovers: Array<{ title: string,data:string }>
}
function outLog() {

}
const Discover = memo((props: DiscoverProper) => {
    const  { discovers } = props
    const [active,setActive] = useState(0)
    return <>
        <p className="exhaust">
            <span>{ discovers[active].title }:</span>
            <span>{ discovers[active].data }</span>
        </p>
        <div className="discover">
            {
                discovers.map((item,index) => {
                    return <div className={ cn('discover-card',{
                        active: active === index
                    }) } key={item.title}  onClick={() => {
                        setActive(index)
                    }
                    }>
                        <h1 className="number line-1">{ item.data }</h1>
                        <p className="label">{ item.title }</p>
                    </div>
                })
            }
        </div>
    </>
})
const Profile = memo(() => {
    const { goBack,push } = useHistory()
    const header = useRef<HTMLDivElement | null>(null)
    const onScroll = useCallback(() => {
        const top = header.current!.getBoundingClientRect().top
        if(top <= 0) {
              header.current!.className = 'sticky-top posts-top'
        } else {
            header.current!.className = 'posts-top'
        }
    },[])
    const [discovers] = useState(() => {
        return [
            {
                title: 'post',
                data: '25k'
            },
            {
                title: 'following',
                data: '211345k'
            },
            {
                title: 'followers',
                data: '2.5k'
            },
        ]
    })
    const [browserShape,setBrowserShape] = useState(0)
    useEffect(() => {
        window.addEventListener('scroll',onScroll)
        return () => {
            window.removeEventListener('scroll',onScroll)
        }
    },[])
    return <article className="view-profile default-bg">
        <header className="top">
            <h1 className="title">Profile</h1>
            <h1 className="more">
                <span className="iconfont iconlog-out" onClick={ () => {
                    push('/login')
                    outLog()
                } }/>
                <span className="iconfont close iconclose" onClick={ () => {
                    goBack()
                } }/>
            </h1>
        </header>
        <section className="user-card">
            <div className="user-info">
                <div className="avatar">
                    <Avatar src={ '' }/>
                    <span className="setting iconfont iconsetting" onClick={ () => {
                        push('/setting')
                    } }/>
                </div>
                <div className="base">
                    <p className="email">@google.com@google.com@google.com</p>
                    <h1 className="name">JoviJovi DanielJovi</h1>
                    <p className="vocation">designer,it,teacher,farmer,postman,policeman</p>
                </div>
            </div>
            <div className="about-me">
                <h2 className="label">About me</h2>
                <div className="brief">
                    Madison Blackstone is a director of user experience design, with experience managing global teams.
                </div>
            </div>
            <Discover discovers={ discovers }/>
        </section>
        <section className="posts">
            <div className="posts-top" ref={ header }>
                <h1 className="title">My Posts</h1>
                {/*<div className="tools">
                    <span  onClick={() => { setBrowserShape(1) }} className={ cn("row iconfont iconmenu1",{
                        active: browserShape === 1
                    }) } />
                    <span onClick={() => { setBrowserShape(0) }}  className={ cn("column iconfont iconmenu",{
                        active: browserShape === 0
                    }) }/>
                </div>*/}
            </div>

            <section className="articles">
                {
                    [1,2,3,4].map(i => {
                        return <div className="article" key={ i }
                            onClick={() => {
                                push('/article?id='+i)
                            }}
                        >
                            <ArticleItem />
                        </div>
                    })
                }
            </section>

        </section>
        <div className="vague" />
    </article>
})
export default Profile