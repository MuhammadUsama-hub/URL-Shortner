// const sessionIdToUserMap = new Map(); //for statefull authentication
// function setUser(id:string, user:User){
//     sessionIdToUserMap.set(id,user)
// }
// function getUser(id:string)
// {
//     return sessionIdToUserMap.get(id)
// }
//State less Authentication using JWT
import jwt from 'jsonwebtoken';
const secretKey = 'Qppw@33$$##^hhwi()_@1';
function setUser(user) {
    return jwt.sign({
        email: user.email,
        password: user.password
    }, secretKey);
}
function getUser(token) {
    try {
        return jwt.verify(token, secretKey);
    }
    catch (error) {
        return null;
    }
}
export { setUser, getUser };
