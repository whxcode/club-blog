import React, {memo} from 'react'
import Image from "@/components/Image"
import {useHistory} from "react-router";
const Articles = memo(() => {
    const { push } = useHistory()
    return <article className="home-articles">
            <section className="moments">
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

            </section>
    </article>
})
export default Articles