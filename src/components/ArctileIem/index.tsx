import React, {memo} from 'react'
import Image from "@/components/Image"
import './index.less'
const ArticleItem = memo(() => {
    return <section className="comp-article-item">
        <div className="cover">
            <Image src={ '' }/>
        </div>
        <div className="base">
            <h1 className="title line-1">BIG DATA</h1>
            <div className="description line-2">
                Why Big Data Needs Thick Data?
                Why Big Data Needs Thick Data?
                Why Big Data Needs Thick Data?
                Why Big Data Needs Thick Data?
                Why Big Data Needs Thick Data?
            </div>
            <div className="others">
                <span className="praise line-1">
                    <i className="icon iconfont iconicontypraise"></i>
                    <i className="content">2.1K</i>
                </span>
                <span className="date line-1">
                     <i className="icon iconfont iconclock"></i>
                    <i className="content ">1hr ag1111111o</i>
                </span>
                <span className="collect">
                     <i className="icon iconfont iconmark1"></i>
                </span>
            </div>
        </div>
    </section>
})
export default ArticleItem