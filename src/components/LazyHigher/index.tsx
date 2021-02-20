import React, { Suspense } from "react"
const LazyHigher = (props: { Children: React.FC }) => {
    const Children = props.Children
    return <Suspense fallback={ <div>loading...</div> }>
            <Children />
    </Suspense>
}
export default (Children: React.FC) => () => <LazyHigher Children={ Children  }/>