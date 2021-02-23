import React, {memo, Suspense, useMemo} from "react"
import './index.less'
const Loading = memo(() => {
    return <section className="comp-loading">
            <div className="loading-wrapper">
                <span className="loading iconfont iconloading" />
            </div>

    </section>
})
const LazyHigher = (props: { Children: React.FC }) => {
    const Children = props.Children
    return <Suspense fallback={    <Loading /> }>
            <Children />
    </Suspense>
}
export default (Children: React.FC) => () => <LazyHigher Children={ Children  }/>