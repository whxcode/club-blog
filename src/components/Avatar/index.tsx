import React, {memo, useState} from 'react'
import Image from "@/components/Image"
import './index.less'
interface Proper{
    src: string
    alt?: string
    radius?: string
    iScale?: number
    oScale?: number
}

const Avatar = memo(({ src,alt,radius,iScale,oScale }: Proper) => {
    radius = radius || '5vw'
    iScale = iScale || .85
    oScale = oScale || .95
    const radiusStyles = {
        borderRadius: radius,
    }
    const scaleInnerStyles = {
        transform: `scale(${ iScale })`
    }
    const scaleOutStyles = {
        transform: `scale(${ oScale })`
    }
    return <div className="comp-avatar" style={{ ...radiusStyles } }>
        <div className="avatar-bg" style={ radiusStyles }></div>
        <div className="avatar-white" style={ { ...radiusStyles,...scaleOutStyles } }></div>
        <div className="avatar-content" style={ { ...radiusStyles,...scaleInnerStyles } }>
            <Image src={ src } alt={ alt }/>
        </div>
    </div>
})
export default Avatar