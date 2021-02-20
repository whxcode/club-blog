import React, {useState} from 'react'
import './index.less'
interface Proper{
    src: string
    alt?: string
    className?: string
}
const images = [
    require('@/asserts/images/placeholder/spring.jpg'),
    require('@/asserts/images/placeholder/summer.jpg'),
    require('@/asserts/images/placeholder/fall.jpg'),
    require('@/asserts/images/placeholder/winter.jpg')
]
const Image = ({ src,alt,className }: Proper) => {
    const [error,setError]  = useState(false)
    const [loading,setLoading]  = useState(false)
    className = className || ''
    function onError() {
        setError(true)
    }
    function onLoading() {
        setLoading(true)
    }
    return <div className={ ["comp-image",className].join(' ') }>
        <img className={ loading ? 'show' : 'hide' } src={ error ?  images[Math.trunc(Math.random() * images.length)] : src } alt={ alt } onError={ onError }
                 onLoad={ onLoading } />
        <div  className={ ['loading',loading ? 'hide' : 'show'].join(' ') }>
            <span className="iconfont iconLoading"></span>
        </div>

    </div>
}
export default Image