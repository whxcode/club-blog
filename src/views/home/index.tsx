import React from "react"
import Navigator from "@/views/home/components/navigator"
import './index.less'
const Home = (props: any) => {
    return <article className="views-home">
        <section className="lower-router">
            { props.children }
        </section>
        <Navigator />
    </article>
}
export default Home