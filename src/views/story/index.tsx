import React, {Dispatch, memo, SetStateAction, useCallback, useEffect, useMemo, useState} from "react"
import AwesomeSwiper,{ ReactSwiperProps } from 'react-awesome-swiper'
import  Swiper,{ SwiperOptions } from 'swiper';
import './index.less'
import {useHistory} from "react-router";
const Story = memo(() => {
    // const [list,setList] = useState(new Array(5).fill(1))
    // const [count,setCount] = useState(0)
    const { push,goBack } = useHistory()
    const list = useMemo(() => {
        return [1,2,3,4,5]
    },[])
    const  slideChange =  useMemo( () => {
        let off = true
        return function (this: Swiper) {
            if(list.length >= 10 && off) {
                this.appendSlide(`<div class="not-data">没有数据了</div>`)
                off = false
                return;
            }

            if( off &&  (list.length - this.activeIndex) <= 2  ) {
                console.log('add')
                const newData = [1,2,3,4,5]
                renderList(this,newData)
                list.push(...newData)

            }
            // console.log(list)
        }
    }
    ,[])

    const renderList = useCallback((slider,list: Array<any>) => {
        slider.appendSlide(list.map((i,ii) => {
            return `
                     <div class="swiper-slide story"
                                       key={ index }
                            >
                            <div class="story-bg">
                                <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1608067339,398987776&fm=26&gp=0.jpg" alt=""/>
                            </div>
                            <div class="story-content">
                                <div class="user-wrapper" onclick="_toProfile()" data-id="${ ii }" >
                                    <div class="avatar-wrapper">
                                        <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3728388047,2037988101&fm=26&gp=0.jpg" alt="" className="avatar"/>
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
    },[])

    const [config,setConfig]: [SwiperOptions,Dispatch<SetStateAction<SwiperOptions>>] = useState<SwiperOptions>( {
        direction: 'vertical',
        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 5,
        height: 0,
        on: {
            slideChange,
            init(w) {
              renderList(this,list)
            }
        },
    })


    useEffect(() => {
        setConfig({ ...config,height: window.screen.height })
        // @ts-ignore
        window._toProfile = (e) => {
            // @ts-ignore

            push(`/profile?id=${ window.event.currentTarget.getAttribute('data-id') }`)
        }
    },[])


    if(!config.height) {
        return <div>loading...</div>
    }
    return <article className="views-story">
        <div className="close iconfont iconclose" onClick={() => { goBack() }}/>
        <AwesomeSwiper config={ config  }   className="swiper-container">
            <div className="swiper-wrapper stories">
              {/*  {
                    list.map((i,index) => {
                        return    <div className="swiper-slide story"
                                       key={ index }
                            >
                            <div className="story-bg">
                                <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1608067339,398987776&fm=26&gp=0.jpg" alt=""/>
                            </div>
                            <div className="story-content">
                                <div className="user-wrapper">
                                    <div className="avatar-wrapper">
                                        <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3728388047,2037988101&fm=26&gp=0.jpg" alt="" className="avatar"/>
                                    </div>
                                    <div className="base">
                                        <h1 className="name line-1">Jasmine Levin</h1>
                                        <p className="date">4m ago</p>
                                    </div>
                                </div>
                                <div className="hot">
                                    <h1 className="title">
                                        Do You Want To Live A Happy Life? Smile.
                                    </h1>
                                    <div className="content">
                                        Sometimes there’s no reason to smile, but I’ll smile anyway because of
                                        life. Yes, I’m one of those people who always smiles.
                                    </div>
                                </div>
                                <div className="heart-wrapper">
                                    <span className="heart iconfont iconheart active"></span>
                                    <span className="digital">450K</span>
                                </div>
                            </div>
                        </div>
                    })
                }*/}
            </div>
        </AwesomeSwiper>
    </article>
})
export default Story