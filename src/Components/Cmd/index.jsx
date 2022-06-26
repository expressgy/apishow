import { Routes, Route,useNavigate } from "react-router-dom";
import css from './index.module.scss'
import goback_img from './goback.svg'
import Debug from "./Debug";
import Admin from "./Admin";

export default function Cmd() {
    //  跳转
    const navigate = useNavigate()

    //  返回上一级
    const handleGoback = () => {
        navigate(-1)
    }

    return (<div className={ css.cmd }>
        <header  className={ css.header }>
            <div>
                <div><img onClick={ handleGoback } src={ goback_img } alt=""/></div>
            </div>
            <div>API Administration</div>
            <div></div>
        </header>
        <div className={ css.body }>
            <Routes>
                //  这里只能写子路由，不能带根路径，不然子路由失效如 '/cmd/admin/*'XXXXXXXXXXXXXXXXXXX错误
                <Route path={'admin/*'} element={ <Admin/> }></Route>
                <Route path={'debug'} element={ <Debug/> }></Route>
                <Route path="*" element={ <Admin/> } />
            </Routes>
        </div>
    </div>)
}