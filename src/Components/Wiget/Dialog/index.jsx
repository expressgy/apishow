import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import css from './index.module.scss';
import close_img from './close.svg'

const doc = window.document

export default function Dialog(props){
    const [node, setNode] = useState(doc.createElement('div'))
    const [hideStatus, setHideStatus] = useState(false)
    const close = () => {
        setHideStatus(true)
        setTimeout(() => {
            props.hideDialog()
        },300)
    }

    useEffect(() => {
        if (node) {
            doc.body.appendChild(node)
        } else {
            const node = doc.createElement('div')
            setNode(node)
        }

        return () => {
            node && doc.body.removeChild(node)
        }
    },[])

    return createPortal(
        <div className={hideStatus ? css.dialog + ' ' + css.hide : css.dialog}>
            <div className={hideStatus ? css.hide : '' }>
                <header title={props.title}>{props.title}</header>
                <div className={css.body}>
                    {props.children}
                </div>
                {typeof props.hideDialog === "function" && (
                    <div onClick={close} className={css.close}><img src={close_img} alt=""/></div>
                )}
            </div>
        </div>,
        node
    )
}

