import React, {memo, useState} from 'react'
import Image from "@/components/Image"
import './index.less'
interface Proper{
    src: string
    alt?: string
    className?: string
    radius?: string
    iScale?: number
    oScale?: number
}

const Avatar = memo(({ src,alt,className,radius,iScale,oScale }: Proper) => {
    radius = radius || '6.93vw'
    iScale = iScale || .8
    oScale = oScale || .9
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
            <Image src={ src }/>
        </div>
    </div>
})
export default Avatar