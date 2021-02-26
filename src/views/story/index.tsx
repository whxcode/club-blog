import React, {Dispatch, memo, SetStateAction, useCallback, useEffect, useMemo, useState} from "react"
import AwesomeSwiper, {ReactSwiperProps} from 'react-awesome-swiper'
import Swiper, {SwiperOptions} from 'swiper';
import './index.less'
import {useHistory} from "react-router"


const imgs: any = []
for (let i = 1; i <= 10; ++i) {
    imgs.push(require(`@/asserts/images/test/${i}.jpg`))
}

// @ts-ignore
window._onLoadImage = function onLoad(this: any) {
    // @ts-ignore
    const img = window.event.path[0]

    // @ts-ignore
    const root = window.event.path[2]
    const content = root.querySelector('.story-content>.hot')

    // @ts-ignore
    var vibrant = new window.Vibrant(img);
    var swatches = vibrant.swatches()

    content.style.background = `rgba(255,255,255,.8)`
    // @ts-ignore
    content.style.color = `${swatches.Vibrant.getHex()}`
}


const Dynamic = memo(() => {
    return <div className="dynamic beat">
        <span className="iconfont iconmoreunfold"/>
        <p>上拉查看更多精彩故事</p>
    </div>
})
const Story = memo(() => {
    const {push, goBack} = useHistory()
    const list = useMemo(() => {
        return [1, 2, 3, 4, 5]
    }, [])
    const slideChange = useMemo(() => {
            let off = true
            return function (this: Swiper) {
                if (list.length >= 10 && off) {
                    this.appendSlide(`<div class="not-data">没有数据了</div>`)
                    off = false
                    return;
                }

                if (off && (list.length - this.activeIndex) <= 2) {

                    const newData = [1, 2, 3, 4, 5]
                    renderList(this, newData)
                    list.push(...newData)

                }

            }
        }
        , [])

    const renderList = useCallback((slider, list: Array<any>) => {
        slider.appendSlide(list.map((i, ii) => {
            return `
                     <div class="swiper-slide story"
                                       key={ index }
                            >
                            <div class="story-bg">
                                <img src="${imgs[ii % 10]}" alt="" onLoad="_onLoadImage(this)"/>
                            </div>
                            <div class="story-content">
                                <div class="user-wrapper" onclick="_toProfile()" data-id="${ii}" >
                                    <div class="avatar-wrapper">
                                        <img src="${imgs[ii % 10]}" alt="" className="avatar"/>
                                    </div>
                                    <div class="base">
                                        <h1 class="name line-1">Jasmine Levin</h1>
                                        <p class="date">4m ago</p>
                                    </div>
                                </div>
                                <div class="hot">
                                    <h1 class="title line-1">
                                        Do You Want To Live A Happy Life? Smile.
                                    </h1>
                                    <div class="content line-5">
                                        Sometimes there’s no reason to smile, but I’ll smile anyway because of
                                        life. Yes, I’m one of those people who always smiles.
                                          Sometimes there’s no reason to smile, but I’ll smile anyway because of
                                        life. Yes, I’m one of those people who always smiles.
                                          Sometimes there’s no reason to smile, but I’ll smile anyway because of
                                        life. Yes, I’m one of those people who always smiles.
                                    </div>
                                </div>
                                <div class="heart-wrapper">
                                    <span class="heart iconfont iconheart active"></span>
                                    <span class="digital">450K</span>
                                </div>
                            </div>
                        </div>
                    `
        }))
    }, [])

    const [config, setConfig]: [SwiperOptions, Dispatch<SetStateAction<SwiperOptions>>] = useState<SwiperOptions>({
        direction: 'vertical',
        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 5,
        height: 0,
        on: {
            slideChange,
            init(w) {
                renderList(this, list)
            }
        },
    })


    useEffect(() => {
        setConfig({...config, height: window.screen.height})
        // @ts-ignore
        window._toProfile = (e) => {
            // @ts-ignore
            push(`/profile?id=${window.event.currentTarget.getAttribute('data-id')}`)
        }
    }, [])


    if (!config.height) {
        return <div>loading...</div>
    }
    return <article className="views-story">
        <div className="close iconfont iconclose" onClick={() => {
            goBack()
        }}/>
        <AwesomeSwiper config={config} className="swiper-container">
            <div className="swiper-wrapper stories"/>
        </AwesomeSwiper>
        <Dynamic/>
    </article>
})
export default Story
