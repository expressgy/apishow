const router = require('koa-router')()
const ProjectSQL = require('../../DB/DB_API/project')
const {query} = require("koa/lib/request");

router.prefix('/askgy/project')

//  获取项目信息列表
router.post('/getProjectList', async (ctx, next) => {
    try{
        const queryData = await ProjectSQL.getProjectInfo();
        console.log(queryData)
        ctx.body = {
            type:'success',
            message:'获取项目信息列表成功',
            data: queryData
        }
    }catch (e) {
        console.log(e)
        ctx.body = {
            type:'error',
            message:'获取项目信息列表失败',
        }
    }
})

//  获取项目信息列表 ID
router.post('/getProjectListForID', async (ctx, next) => {
    if(!ctx.request.body.id){
        // console.log(ctx.request.body)
        ctx.body = {
            type:'error',
            message:'未找到项目id',
        }
        return false
    }
    const id = ctx.request.body.id
    try{
        const queryData = await ProjectSQL.getProjectInfoForID(id);
        console.log(queryData)
        ctx.body = {
            type:'success',
            message:'获取项目信息成功',
            data: queryData
        }
    }catch (e) {
        console.log(e)
        ctx.body = {
            type:'error',
            message:'获取项目信息失败',
        }
    }
})

//  创建项目信息
router.post('/createproject', async (ctx, next) => {
    if(!ctx.request.body.pName || !ctx.request.body.pCreator || !ctx.request.body.pPeople){
        // console.log(ctx.request.body)
        ctx.body = {
            type:'error',
            message:'未找到项目的添加信息',
        }
        return false
    }
    const pName = ctx.request.body.pName
    const pCreator = ctx.request.body.pCreator
    const pPeople = ctx.request.body.pPeople

    try{
        const queryData = await ProjectSQL.createProjectInfo(pName, pCreator, pPeople);
        ctx.body = {
            type:'success',
            message:'创建项目信息成功！',
            data:queryData
        }
    }catch (e) {
        ctx.body = {
            type:'error',
            message:'创建项目信息错误',
            data:e
        }
    }
})

//  修改项目信息
router.post('/editProject', async (ctx, next) => {
    if(!ctx.request.body.pName || !ctx.request.body.pCreator || !ctx.request.body.pPeople || !ctx.request.body.id){
        // console.log(ctx.request.body)
        ctx.body = {
            type:'error',
            message:'未找到项目的修改信息',
        }
        return false
    }
    const pName = ctx.request.body.pName
    const pCreator = ctx.request.body.pCreator
    const pPeople = ctx.request.body.pPeople
    const id = ctx.request.body.id

    try{
        const queryData = await ProjectSQL.editProjectInfo(pName, pCreator, pPeople, id);
        ctx.body = {
            type:'success',
            message:'修改项目信息成功！',
            data:queryData
        }
    }catch (e) {
        ctx.body = {
            type:'error',
            message:'修改项目信息错误',
            data:e
        }
    }
})

//  删除项目信息
router.post('/deleteProject', async (ctx, next) => {
    if(!ctx.request.body.id){
        // console.log(ctx.request.body)
        ctx.body = {
            type:'error',
            message:'未找到项目的删除信息',
        }
        return false
    }
    const id = ctx.request.body.id

    try{
        const queryData = await ProjectSQL.deleteProjectInfo(id);
        ctx.body = {
            type:'success',
            message:'删除项目信息成功！',
            data:queryData
        }
    }catch (e) {
        ctx.body = {
            type:'error',
            message:'删除项目信息错误',
            data:e
        }
    }
})

//  查找项目信息
router.post('/searchProject', async (ctx, next) => {
    if(!ctx.request.body.searchName){
        // console.log(ctx.request.body)
        ctx.body = {
            type:'error',
            message:'未找到项目信息',
        }
        return false
    }
    const searchName = ctx.request.body.searchName

    try{
        const queryData = await ProjectSQL.searchProjectInfo(searchName);
        ctx.body = {
            type:'success',
            message:'查找项目信息成功！',
            data:queryData
        }
    }catch (e) {
        ctx.body = {
            type:'error',
            message:'查找项目信息错误',
            data:e
        }
    }
})

module.exports = router