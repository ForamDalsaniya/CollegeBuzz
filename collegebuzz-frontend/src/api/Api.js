export const base_url = "https://localhost:7036/api";

export const apis = {
    postarticle : `${base_url}/Articles`,
    allarticle : `${base_url}/Articles`,
    allnews : `${base_url}/News`,
    allstudent : `${base_url}/Students`,
    registerStudent : `${base_url}/Users/registerStudent`,
    registerfaculty : `${base_url}/Users/registerFaculty`,
    markapprove:`${base_url}/Students/markApprove`,
    allfaculties: `${base_url}/Faculties`,
    approvedarticle: `${base_url}/Articles/approvedArticle`,
    notapprovedarticle: `${base_url}/Articles/notApprovedArticle`,
    markarticleapprove:`${base_url}/Articles/markApprove`,
    allevents:`${base_url}/Events`,
    login:`${base_url}/Users/Login`,
    forgetpass:`${base_url}/Users/forgetPassword`,
    resetpass:`${base_url}/Users/resetpassword`,
};