import React, {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import Image from "@/components/Image"
import {useHistory} from "react-router"

const WaterFall = memo((props: any) => {
    const { list } = props
    const [columns,setColumns] = useState( () => {
        const col = Math.ceil(window.screen.width / 190)
        return col > 3 ? 3 : col < 2 ? 2 : col
    } )

    const columnArray: any = useMemo(() => {
        const data = Array.from(new Array(columns),() => [])
        let counter = 0
        // 比较
        const cols = document.querySelectorAll('.water-fall > .col')

        for(let i = 0;i != list.length;++ i) {
            // @ts-ignore
            const i = counter ++ % data.length

            // @ts-ignore
            data[i].push(list[i])

        }
        return data
    },[columns,list,])



    return <section className="water-fall">
        {
            list.map((item: any,index: number) => {

                        return <div className="item" key={  index }>
                            <img src={ require(`@/asserts/images/test/${

                                Math.trunc(Math.random() * 10) + 1
                                
                            }.jpg`) } alt=""/>
                            <p>{ index }</p>
                        </div>
                    })


        }
     {/*   {
            columnArray.map((item: any,index: any) => {
                return <div className="col" key={ index }>
                    { item.map((item: any,iIindex: number) => {
                        return <div className="item" key={ `${ index }-${ iIindex }` }>
                            <img src={ require(`@/asserts/images/test/${ 
                                (item % 4) >= 5 ? 4 :  (item % 4) <= 0 ?  1 :  (item % 4)
                            }.jpg`) } alt=""/>
                        </div>
                    })  }
                </div>
            })
        }*/}
    </section>
})

const Articles = memo(() => {
    const { push } = useHistory()
    const [list,setList] = useState([1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12])
    const loading = useRef<HTMLDivElement>(null)
    const onScroll = useCallback(() => {
        if(Math.ceil((document.body.scrollTop || document.documentElement.scrollTop))
            + (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)
            >= (document.documentElement.scrollHeight || document.body.scrollHeight)
        ) {

            setTimeout(() => {
                setList([...list,
                    list.length + 1,
                    list.length + 2,
                    list.length + 3,
                    list.length + 4,
                    list.length + 5,
                ])
            },2000)

        }


    },[list])
    useEffect(() => {
     /*   const timerId = setInterval(() => {
            setList([...list,list.length + 1,list.length + 2])
        },10000)*/
       // console.log(list)
        return () => {
          //  clearInterval(timerId)
        }
    })
    useEffect(() => {
        window.addEventListener('scroll',onScroll,false)
        return () => {
            window.removeEventListener('scroll',onScroll)
        }
    })
    return <article className="home-articles">
            {/* <section className="moments">
                <div className="smart" onClick={ () => push('/article?id=1') }><Image className="custom-cover" src="1"/></div>
                <div className="large" onClick={ () => push('/article?id=1') }><Image className="custom-cover" src="1"/></div>
                <div className="large margin-top-fifteen" onClick={ () => push('/article?id=1') }><Image className="custom-cover" src="1"/></div>
                <div className="smart margin-top-fifteen" onClick={ () => push('/article?id=1') }><Image className="custom-cover" src="1"/></div>
            </section>
            <section className="list">
                {
                    [1,2,3,4].map(item => {
                        return   <div className="card" key={ item } onClick={ () => push('/article?id'+item) }>
                            <h1 className="title line-2">Read the article you want instantlyRead the article you want instantlyRead the article you want instantly</h1>
                            <div className="description line-3">
                                <Image src="1" className="custom-icon"/>
                                You can read thousands of articles on Blog ClubYou can read thousands of articles on Blog Club, s
                                ave them iYou can read thousands of articles on Blog Club, save them i, save them in the appl
                                ication and share them with your loved ones.</div>
                        </div>
                    })

                }

            </section>*/}
            {/*<h1>{ list.length }</h1>*/}
            <WaterFall list={ list }/>
            <div className="loading" ref={ loading }>
                <span className="wrapper">
                      <span className="iconfont iconloading"></span>
                </span>

            </div>
    </article>
})
export default Articles