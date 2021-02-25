import React, {
    ChangeEvent,
    createContext,
    memo,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState
} from "react"
import cn from 'classnames'
function createDownloadFile(file: File) {
    var blob = new Blob([file]);
    return URL.createObjectURL(blob);
}
const InputContext = createContext({
    title: '',
    summary: '',
})

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
    tags: Array<any>
}


function editModify(ele: HTMLElement) {
    const edit:any = document.querySelector('#editContent')
    const selection: any = window.getSelection()
    edit.appendChild(ele)

    // 创建新的光标对象
    var range = document.createRange()
    console.log(range)
    // 光标对象的范围界定为新建的表情节点
    range.selectNodeContents(edit)
    // 光标位置定位在表情节点的最大长度
    range.setStart(edit,edit.childNodes.length)
    // 使光标开始和光标结束重叠
    range.collapse(true)
    // 清除选定对象的所有光标对象
    selection.removeAllRanges()
    // 插入新的光标对象
    selection.addRange(range)

}

const ModalNewLink = memo((props: any) => {
    const { setVisible } = props
    const refLabel = useRef<HTMLInputElement | null>(null)
    const refLink = useRef<HTMLInputElement | null>(null)
    const onClick = useCallback(() => {
        const label = refLabel.current!.value
        const href = refLink.current!.value
        const a = document.createElement('a')
        a.innerText = label
        a.href = href
        a.contentEditable = "false"
        editModify(a)
    },[])
    return <div className="modal-new-link"   onClick={(e) => e.stopPropagation()}>
        <p className="title">新增链接</p>
        <div className="container">
            <input  ref={ refLabel } value={ 'google' }  type="text" className="container-label" placeholder="请输入内容"/>
            <input  ref={ refLink }  value={ 'google' } type="text" className="container-link" placeholder="请输入链接"/>
        </div>
        <p className="send" onClick={ () => {
            onClick()
            setVisible(false)
        } }>确定</p>
    </div>
})

const EditContent = memo((props: EditContentProper) => {
    const { tags } = props
    const [visible,setVisible] = useState(false)
    const abstract = useContext(InputContext)

    const instance = useRef<HTMLDivElement>(null)
    const photoControl = useRef<HTMLInputElement>(null)
    const CoverControl = useRef<HTMLInputElement>(null)
    const [cover,setCover] = useState('')
    const onSave = useCallback(() => {
        const content = instance.current!
        const marks = tags.filter(tag => tag.active).map(tag => tag.content)
        const params = {
            ...abstract,
            tags: marks,
            content: content.innerHTML,
            cover
        }

        console.log(params)

    }, [abstract,cover])
    function onChangePhoto(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files![0]
        const url = createDownloadFile(file)
        const img = document.createElement('img')
        img.src = url
        if(!cover) {
            setCover(url)
        }
        editModify(img)
        e.target.value = ''
    }
    function onChangeCover(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files![0]
        const url = createDownloadFile(file)
        setCover(url)
    }

    return <>
        <div className="content"
             id="editContent"
             ref={ instance }
             contentEditable={true}

             suppressContentEditableWarning
        />
        <section className="tools">
            <div className="tool" onClick={
                () => {  CoverControl.current!.click()  }
            } >
                { cover ?
                    <img src={ cover } alt=""/>
                    :
                    <span className=" upload-cover iconfont icondraws"/>
                }
                <input  ref={ CoverControl } type="file" onChange={ onChangeCover }
                        className="hidden"/>
            </div>
            <div className="tool photo" onClick={() => {
                photoControl.current!.click()
            }}>
                <span className="iconfont iconphoto"/>
                <input  ref={ photoControl } type="file" onChange={ onChangePhoto }
                        className="hidden"/>
            </div>

            <div className="tool" onClick={onSave}>
                <span className=" upload-cover iconfont iconSave"/>
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
            content: 'js'
        },
        {
            active: false,
            content: 'c'
        },
        {
            active: false,
            content: 'go'
        },
        {
            active: false,
            content: 'php'
        }
    ])
    const [abstract,setAbstract] = useState({
        title: '',
        summary: '',
    })
    const update = (index: number, active: boolean) => {
        const newTags = [...tags]
        newTags[index].active = active
        setTags(newTags)
    }
    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setAbstract({
            ...abstract,
            [e.target.name]: e.target.value
        })
    },[abstract])

    return <article className="home-plus">
        <header className="header">
            <div className="title">
                <input type="text"   value={ abstract.title } name="title" placeholder="title,please" onChange={ onChange }/>
            </div>
            <div className="simple">
                <input type="text"  value={ abstract.summary } name="summary" placeholder="summary,please"  onChange={ onChange }/>
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
            <InputContext.Provider value={ abstract }>
                <EditContent tags={ tags }/>
            </InputContext.Provider>
        </section>
    </article>
}
export default Plus