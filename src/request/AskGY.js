import ask from "./test";

const Ask = new ask()


const AskGY = {
    /**
     * 演示
     * */
    checkDuplicateForUsername : async info => {return Ask.post('/askgy/sign/checkDuplicateForUsername',info)},
    /**
     * 项目
     * */
    createProject : async info => {return Ask.post('/askgy/project/createproject',info)},
    getProjectList : async info => {return Ask.post('/askgy/project/getProjectList',info)},
    getProjectListForID : async info => {return Ask.post('/askgy/project/getProjectListForID',info)},
    editProject :  async info => {return Ask.post('/askgy/project/editProject',info)},
    deleteProject :  async info => {return Ask.post('/askgy/project/deleteProject',info)},
    searchProject :  async info => {return Ask.post('/askgy/project/searchProject',info)},

}

export default AskGY