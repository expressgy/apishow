import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import css from './index.module.scss'
import search_img from './search.svg'
import add1_img from './add1.svg'
import add2_img from './add2.svg'
import Dialog from "../../../Wiget/Dialog";
import AskGY from "../../../../request/AskGY";

import delete_img from './delete.svg'
import edit_img from './edit.svg'
import module_img from '../module.svg'

export default function ProjectAdmin() {
    //  页面跳转
    const navigate = useNavigate()
    //  本页项目列表刷新
    const [reflush, setReflush] = useState(true)
    //  查询值
    const [projestName, setProjectName] = useState('');
    //  Body展示信息
    const [projectList, setProjectList] = useState([]);
    //  新建弹窗状态
    const [addDialogStatus, setAddDialogStatus] = useState(false);
    //  添加窗口状态修改
    const handleAddDialogStatusClick = () => {
        setAddDialogStatus(!addDialogStatus)
    }
    //  新建项目的信息
    const [pName, setPName] = useState('')
    const [pCreator, setPCreator] = useState('')
    const [pPeople, setPPeople] = useState('')
    //  编辑窗口状态
    const [editStatus, setEditStatus] =  useState(false);
    //  修改编辑窗口状态
    const handleEditDialogStatusClick = () => {
        setEditStatus(!editStatus)
    }
    //  编辑项目信息
    const [npName, setnPName] = useState('')
    const [npCreator, setnPCreator] = useState('')
    const [npPeople, setnPPeople] = useState('')
    //  点击项目
    const handleChooseProjectCilck = data => {
        return () => {
            window.apishow.nowProjectID = data.ID
            setnPName(data.pName)
            setnPCreator(data.pCreator)
            setnPPeople(data.pPeople)
        }
    }
    //  删除项目窗口状态
    const [deleteStatus, setDeleteStatus] = useState(false);
    const handleDeleteDialogStatusClick = () => {
        setDeleteStatus(!deleteStatus)
    }
    //  受控组件改变企业信息
    const handleCreateInfoChange = name => {
        return event => {
            switch (name) {
                case 'pName':
                    setPName(event.target.value)
                    break;
                case 'pCreator':
                    setPCreator(event.target.value)
                    break;
                case 'pPeople':
                    setPPeople(event.target.value)
                    break
            }
        }
    }
    const handleEditInfoChange = name => {
        return event => {
            switch (name) {
                case 'pName':
                    setnPName(event.target.value)
                    break;
                case 'pCreator':
                    setnPCreator(event.target.value)
                    break;
                case 'pPeople':
                    setnPPeople(event.target.value)
                    break
            }
        }
    }

    //  项目名称查询键值变化
    const handleProjectNameCahnge = event => {
        if (event.target.value != projestName) {
            setProjectName(event.target.value)
        }
    }
    //  进入首页进行查询操作
    useEffect(() => {
        AskGY.getProjectList().then(returnData => {
            setProjectList(returnData.data)
        })
        return () => {

        }
    }, [window.location.pathname, reflush])
    //  发起查询项目列表请求
    const handleKeyUpToSearch = async event => {
        const {key, keyCode} = event;
        // console.log(key,keyCode)
        const searchName = projestName ? projestName : 'EMPTY'
        if (keyCode == 13) {
            // 查询
            const returnData = await AskGY.searchProject({searchName})
            setProjectList(returnData.data)
            console.log('查询', returnData.data)
        }
    }
    //  发起创建企业请求
    const handleCreateProjectSubmitClick = async () => {
        console.log('提交创建企业')
        const returnData = await AskGY.createProject({
            pName, pCreator, pPeople
        })
        setPName('')
        setPCreator('')
        setPPeople('')
        handleAddDialogStatusClick()
        setReflush(!reflush)
    }
    //  发起修改请求
    const handleEditProjectSubmitClick = async () => {
        console.log('请求更新',window.apishow.nowProjectID)
        const oldData = projectList.filter(projectOne => {
            return projectOne.id == window.apishow.nowProjectID ? projectOne : false
        })[0]
        if(oldData.pName == npName && oldData.pCreator == npCreator && oldData.pPeople == npPeople){
            console.log('未修改')
        }else{
            console.log('发起请求')
            const returnData = await AskGY.editProject({
                id:window.apishow.nowProjectID,
                pName:npName,
                pCreator:npCreator,
                pPeople:npPeople
            })
            setReflush(!reflush)
        }
        handleEditDialogStatusClick()
    }
    //  发起删除请求
    const handleDeleteProjectSubmitClick = async () => {
        console.log('请求删除',window.apishow.nowProjectID)
        const returnData = await AskGY.deleteProject({id:window.apishow.nowProjectID})
        setReflush(!reflush)
        handleDeleteDialogStatusClick()
    }

    //  跳转至模块
    const handleGotoModuleClick = () => {
        navigate('/cmd/admin/moduleAdministration')
    }
    //  Body
    return (<div className={css.ProjectAdmin}>
        <header>
            <div>
                <div><img src={search_img} alt=""/></div>
                <div><input type="text" value={projestName} onChange={handleProjectNameCahnge}
                            placeholder={'Press Enter to Search'} onKeyUp={handleKeyUpToSearch}/></div>
                {addDialogStatus && <Dialog hideDialog={handleAddDialogStatusClick} title='添加项目'>
                    <div className={css.addProjectDialog}>
                        <div>
                            <div>
                                <div>项目名</div>
                                <div><input type="text" value={pName} onChange={handleCreateInfoChange('pName')}/></div>
                            </div>
                            <div>
                                <div>创建人</div>
                                <div><input type="text" value={pCreator} onChange={handleCreateInfoChange('pCreator')}/>
                                </div>
                            </div>
                            <div>
                                <div>参与人员</div>
                                <div><input type="text" value={pPeople} onChange={handleCreateInfoChange('pPeople')}/>
                                </div>
                            </div>
                        </div>
                        <footer>
                            <div className={'widthAuto'} onClick={handleCreateProjectSubmitClick}>提交</div>
                        </footer>
                    </div>
                </Dialog>}
            </div>
            <div onClick={handleAddDialogStatusClick}><img src={add1_img} alt=""/><img src={add2_img} alt=""/></div>
        </header>
        <div className={css.body}>
            {projectList.length == 0 ? <div className={css.message}>没有项目信息，请先添加</div> :
                <div className={css.ProjectList}>
                    {projectList.map(projectOne => {
                        return (<div key={projectOne.id} onClick={handleChooseProjectCilck({pName:projectOne.pName, pCreator:projectOne.pCreator, pPeople:projectOne.pPeople, ID:projectOne.id})}>
                            <div>{projectOne.id}</div>
                            <div>
                                <div>
                                    <div>{projectOne.pName}</div>
                                    <div>建立者: {projectOne.pCreator}</div>
                                    <div>参与者: {projectOne.pPeople}</div>
                                </div>
                                <div>
                                    <div>{new Date(projectOne.createtime).Format("yyyy-MM-dd HH:mm")}</div>
                                    <div>
                                        <div onClick={handleGotoModuleClick}><img src={module_img} alt="goto module"/></div>
                                        <div onClick={handleEditDialogStatusClick}><img src={edit_img} alt="edit this"/></div>
                                        <div onClick={handleDeleteDialogStatusClick}><img src={delete_img} alt="delete this"/></div>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    })}
                </div>
            }
        </div>
        {editStatus && <Dialog hideDialog={handleEditDialogStatusClick} title='项目信息编辑'>
            <div className={css.addProjectDialog}>
                <div>
                    <div>
                        <div>项目名</div>
                        <div><input type="text" value={npName} onChange={handleEditInfoChange('pName')}/></div>
                    </div>
                    <div>
                        <div>创建人</div>
                        <div><input type="text" value={npCreator} onChange={handleEditInfoChange('pCreator')}/>
                        </div>
                    </div>
                    <div>
                        <div>参与人员</div>
                        <div><input type="text" value={npPeople} onChange={handleEditInfoChange('pPeople')}/>
                        </div>
                    </div>
                </div>
                <footer>
                    <div className={'widthAuto'} onClick={handleEditProjectSubmitClick}>提交</div>
                </footer>
            </div>
        </Dialog>}
        {deleteStatus && <Dialog hideDialog={handleDeleteDialogStatusClick} title={'删除项目'}>
            <div className={css.addProjectDialog}>
                <div>
                    <div>
                        <div>项目名</div>
                        <div style={{overflow:'hidden','text-overflow':'ellipsis','white-space': 'nowrap',display:'block',width:'25rem',fontSize:'1.4rem'}}>{npName}</div>
                    </div>
                    <div>
                        <div>创建人</div>
                        <div style={{overflow:'hidden','text-overflow':'ellipsis','white-space': 'nowrap',display:'block',width:'25rem',fontSize:'1.4rem'}}>{npCreator}</div>
                    </div>
                    <div>
                        <div>参与人员</div>
                        <div style={{overflow:'hidden','text-overflow':'ellipsis','white-space': 'nowrap',display:'block',width:'25rem',fontSize:'1.4rem'}}>{npPeople}</div>
                    </div>
                </div>
                <footer>
                    <div className={'widthAuto'} onClick={handleDeleteProjectSubmitClick}>确认删除</div>
                </footer>
            </div>
        </Dialog>}
    </div>)
}