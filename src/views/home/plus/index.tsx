import React from "react"
const Plus = () => {
    return <article className="home-plus">
       <header className="header">
           <div className="title">
               <input type="text" name="title" placeholder="title,please"/>
           </div>
           <div className="simple">
               <input type="text" name="simple" placeholder="simple,please"/>
           </div>
       </header>
        <section className="tags">
            <span className="add-tag">Add Tags</span>
            <div className="tag">
                <span className="content">Art</span>
                <span className="remove">
                   <i className="iconi-add iconfont"></i>
               </span>
            </div>
            <div className="tag">
                <span className="content">Art</span>
                <span className="remove">
                   <i className="iconi-add iconfont"></i>
               </span>
            </div>
            <div className="tag">
                <span className="content">Art</span>
                <span className="remove">
                   <i className="iconi-add iconfont"></i>
               </span>
            </div>
        </section>
        <section className="body">
            <div className="label">Article Content</div>
            <div className="content" contentEditable={ true }>
                Copy texts
                Copy texts
                This one got an incredible amount of backlash the last time I said it, so I’m going to say it again: a man’s sexuality is never, ever your responsibility, under any circumstances. Whether it’s t
                This one got an incredible amount
                of backlash the last time I said it, so I’m
                going to say it again: a man’s sexuality is never, ever your responsibility, under any circumstances. Whether it’s the fifth date or your twentieth year of marriage, the correct determining factor for whether or not you have sex with your partner isn’t whether you ought to “take care of him” or “put out” because it’s been a while or he’s really horny.
            </div>
        </section>
        <section className="tools">
            <div className="tool ">
                <span className=" upload-cover iconfont icondraws"></span>
            </div>
            <div className="tool photo">
                <span className="iconfont iconphoto"></span>
            </div>
            <div className="tool video">
                <span className="iconfont iconvideo"></span>
            </div>
            <div className="tool link">
                <span className="iconfont iconlink"></span>
            </div>
        </section>
    </article>
}
export default Plus