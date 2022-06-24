
import css from './index.module.scss'

export default function Admin(){
    return (<div className={ css.admin }>
        <div className={ css.left }></div>
        <div className={ css.right }></div>
    </div>)
}