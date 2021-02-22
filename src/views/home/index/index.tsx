import React, {memo, useCallback} from "react"
import AwesomeSwiper from 'react-awesome-swiper'
import Avatar from "@/components/Avatar"
import Image from "@/components/Image"
import ArticleItem from "@/components/ArctileIem"
import {useHistory} from "react-router"
const config: any = {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
    },

};
const Index = memo(() => {
    const { push } = useHistory()
    const toProfile = useCallback(() => {
        push('/profile')
    },[])
    return <article className="home-index">
        <header className="header">
            <p className="phrase">Hi,today</p>
            <h1 className="lately-user">Lately user</h1>
            <span className="user" onClick={ toProfile }>
                <i className="icon iconfont iconuser" />
            </span>
        </header>
        <section className="swip">

        </section>
        <section className="lately-users">
            <ul className="users">
                <li className="item">
                    <div className="user">
                        <Avatar src={''} radius={ '5vw' } iScale={ .85 } oScale={ .95 }/>
                    </div>
                    <p className="username">email</p>
                </li>
                <li className="item">
                    <div className="user">
                        <Avatar src={''} radius={ '5vw' } iScale={ .85 } oScale={ .95 }/>
                    </div>
                    <p className="username">email</p>
                </li>
                <li className="item">
                    <div className="user">
                        <Avatar src={''} radius={ '5vw' } iScale={ .85 } oScale={ .95 }/>
                    </div>
                    <p className="username">email</p>
                </li>
            </ul>
        </section>
        <section className="hots">
            <AwesomeSwiper config={config} className="your-classname">
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        <div className="hot">
                            <Image className="hot-card" src="https://ss1.bdstatic.com/70c1FuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3551370719,1936559374&fm=26&gp=0.jpg"/>
                            <p className="title">Tomorrow</p>
                        </div>

                    </div>
                    <div className="swiper-slide">
                        <div className="hot">
                            <Image className="hot-card" src="https://ss1.bdstatic.com/70c1FuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3551370719,1936559374&fm=26&gp=0.jpg"/>
                            <p className="title">Tomorrow</p>
                        </div>
                    </div>
                </div>
            </AwesomeSwiper>
        </section>
        <section className="lately-articles">
            <div className="label">
                Latest News
            </div>
            <section className="articles">
                <div className="article">
                    <ArticleItem />
                </div>

                <div className="article">
                    <ArticleItem />
                </div>

                <div className="article">
                    <ArticleItem />
                </div>

            </section>

        </section>
    </article>
})
export default Index