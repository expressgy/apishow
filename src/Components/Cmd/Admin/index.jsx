import {useNavigate, useRoutes, Routes, Route} from 'react-router-dom'
import css from './index.module.scss'
import star_img from './star.svg'
import module_img from './module.svg'
import docker_img from './docker.svg'
import net_img from './net.svg'
import tree_img from './tree.svg'
import ProjectAdmin from "./ProjectAdmin";
import ModuleAdmin from "./ModuleAdmin";
import RegionAdmin from "./RegionAdmin";
import InterfaceAdmin from "./InterfaceAdmin";
import ShowTree from "./ShowTree";

export default function Admin() {
    //  跳转
    const navigate = useNavigate()

    const menuList = {
        'projectAdministration': {
            name: '项目管理',
            page: <ProjectAdmin/>,
            ico: star_img
        },
        'moduleAdministration': {
            name: '模块管理',
            page: <ModuleAdmin/>,
            ico: module_img
        },
        'regionAdministration': {
            name: '区域管理',
            page: <RegionAdmin/>,
            ico: docker_img
        },
        'interfaceAdministration': {
            name: '接口管理',
            page: <InterfaceAdmin/>,
            ico: net_img
        },
        'showTree': {
            name: '树形结构',
            page: <ShowTree/>,
            ico: tree_img
        },
        '*': {
            name: '树形结构',
            page: <ShowTree/>,
            ico: tree_img
        }
    }

    const handleMenuChoose = name => {
        return () => {
            // console.log('/cmd/admin/' + name)
            navigate('/cmd/admin/' + name)
        }
    }

    return (<div className={css.admin}>
        <div className={css.left}>
            <div>Menu</div>
            <div>
                <div>
                    {
                        Object.keys(menuList).map(menuName => {
                            return menuName == '*' ? null :<div key={menuName} className={window.location.pathname.split('/').slice(-1) == menuName ? css.choose : ''} onClick={handleMenuChoose(menuName)}><img
                                src={menuList[menuName].ico} alt=""/>{menuList[menuName].name}</div>
                        })
                    }
                </div>
            </div>
            <div>Version 0.1</div>
        </div>
        <div className={css.right}>
            {/*<RoutersForAdmin/>*/}
            <Routes>
                {
                    Object.keys(menuList).map((menuName, index) => {
                        return <Route key={menuName} path={menuName} element={menuList[menuName].page}/>
                    })
                }
            </Routes>
        </div>
    </div>)
}

