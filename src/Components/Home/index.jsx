import { useNavigate } from "react-router-dom"
import css from './index.module.scss'
import fox_img from './fox.webp'


export default function Home() {
    //  建立跳转Hooks
    const navigate = useNavigate()
    //  点击API管理
    const handleAdminClick = () => {
        console.log('ADMIN')
        navigate('/cmd/admin')
    }
    //  点击API调试
    const handleDebugClick = () => {
        console.log("DEBUG")
        navigate('/cmd/debug')
    }
    return (<div className={ css.home }>
        <div>
            <div>
                <div><img src={ fox_img } alt=""/></div>
                <div>API Show</div>
            </div>

            <div>
                <div onClick={ handleAdminClick }>API Administration</div>
                <div onClick={ handleDebugClick }>API Debugging</div>
            </div>
        </div>
    </div>)
}
