import React, {memo, useCallback, useEffect, useMemo, useRef, useState} from "react"
import cn from 'classnames'

interface localTagSigner {
    active: boolean,
    content: string
}

type localType = Array<localTagSigner>

interface localTagProper extends localTagSigner {
    update: (index: number, active: boolean) => void
    index: number
}

interface EditContentProper {

}

var lastEditRange: any = null
function editModify({ label,href }: { label: string, href: string }) {

        // 获取编辑框对象
        var edit: any = document.getElementById('editContent')
        // 获取输入框对象

        edit.focus()
        // 获取选定对象
        var selection: any = getSelection()
        // 判断是否有最后光标对象存在

        // 判断选定对象范围是编辑框还是文本节点
        if(lastEditRange) {
            selection.removeAllRanges()
            selection.addRange(lastEditRange)
        }
        var a = document.createElement('a')
        a.contentEditable = 'false'

        a.innerText = label
        a.href = href

        if (selection.anchorNode.nodeName !== '#text') {
            // 如果是编辑框范围。则创建表情文本节点进行插入

            // 否则直接插入一个表情元素
            edit.appendChild(a)
            // 创建新的光标对象
            var range = document.createRange()
            // 光标对象的范围界定为新建的表情节点
            range.selectNodeContents(edit)

            // 光标位置定位在表情节点的最大长度
            range.setStart(edit,edit.childNodes.length)
            // range.setEnd(edit,)
            // 使光标开始和光标结束重叠
            range.collapse(true)
            // 清除选定对象的所有光标对象
            selection.removeAllRanges()
            // 插入新的光标对象
            selection.addRange(range)
        }
        else {
            // @ts-ignore
            var range: any = selection.getRangeAt(0)
            // 获取光标对象的范围界定对象，一般就是textNode对象
            var textNode: any = range.startContainer;
            // 获取光标位置
            var rangeStartOffset = range.startOffset;
            console.log(rangeStartOffset)
            textNode.parentNode.appendChild(a)
            range.setStart(textNode.parentNode, textNode.parentNode.childNodes.length)

            range.collapse(true)
            //  range.setEndAfter(edit)
            // 清除选定对象的所有光标对象
            selection.removeAllRanges()
            // 插入新的光标对象
            selection.addRange(range)
        }
        lastEditRange = selection.getRangeAt(0)
}

const ModalNewLink = memo((props: any) => {
    const { setVisible } = props
    const refLabel = useRef<HTMLInputElement | null>(null)
    const refLink = useRef<HTMLInputElement | null>(null)
    const onClick = useCallback(() => {
        const label = refLabel.current!.value
        const href = refLink.current!.value
        editModify({
            label,href
        })
    },[])
    return <div className="modal-new-link"   onClick={(e) => e.stopPropagation()}>
        <p className="title">新增链接</p>
        <div className="container">
            <input  ref={ refLabel }  type="text" className="container-label" placeholder="请输入内容"/>
            <input  ref={ refLink }  type="text" className="container-link" placeholder="请输入链接"/>
        </div>
        <p className="send" onClick={ () => {
            onClick()
            setVisible(false)
        } }>确定</p>
    </div>
})

const EditContent = memo((props: EditContentProper) => {
    const [visible,setVisible] = useState(true)
    const instance = useRef<HTMLDivElement>(null)
    const onSave = useCallback(() => {
        const content = instance.current!
        console.log(content.innerHTML)
    }, [])


    return <>
        <div className="content"
             id="editContent"
             ref={ instance }
             contentEditable={true}
             suppressContentEditableWarning

        />
        <section className="tools">
            <div className="tool ">
                <span className=" upload-cover iconfont icondraws"/>
            </div>
            <div className="tool photo">
                <span className="iconfont iconphoto"/>
            </div>

            <div className="tool" onClick={onSave}>
                <span className=" upload-cover iconfont icondraws"/>
            </div>

            <div className="tool video">
                <span className="iconfont iconvideo"/>
            </div>
            <div className="tool link" onClick={ () => {
                setVisible(!visible)
            } }>
                <span className="iconfont iconlink"/>
            </div>
        </section>
        {
            visible &&
            <div className="mask" onClick={ () => {
                setVisible(!visible)
            }
            }>
                <ModalNewLink

                    setVisible={ setVisible } />
            </div>
        }


    </>
})

const Tag = (props: localTagProper) => {
    const {active, content, update, index} = props
    return <div className="tag" onClick={() => {
        update(index, !active)
    }}>
        <span className="content">{content}</span>
        <span className={cn("remove", {
            checked: active,
        })}>
                   <i className={cn("iconfont", {
                       'iconclose': active,
                       'iconsuccess': !active
                   })}/>
        </span>
    </div>
}
const Plus = () => {
    const [tags, setTags] = useState([
        {
            active: false,
            content: 'art'
        },
        {
            active: false,
            content: 'art'
        },
        {
            active: false,
            content: 'art'
        },
        {
            active: false,
            content: 'art'
        }
    ])
    const update = (index: number, active: boolean) => {
        const newTags = [...tags]
        newTags[index].active = active
        setTags(newTags)
    }


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
            <span className="add-tag">Tags</span>
            {
                tags.map((item, index) => {
                    return <Tag {...item}
                                index={index}
                                update={update}
                                key={index}/>
                })
            }
        </section>
        <section className="body">
            <div className="label">Article Content</div>
            <EditContent/>
        </section>
    </article>
}
export default Plus