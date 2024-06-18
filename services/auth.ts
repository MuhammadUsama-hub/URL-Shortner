interface User{
    email:string,
    password:string
}
const sessionIdToUserMap = new Map();

function setUser(id:string, user:User){
    sessionIdToUserMap.set(id,user)
}

function getUser(id:string)
{
    return sessionIdToUserMap.get(id)
}
export{
    setUser,
    getUser
}