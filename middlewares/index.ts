import {Request,Response,NextFunction} from 'express'
import {getUser} from '../services/auth.js'

async function restrictTologgedInUsers(req:Request,res:Response,next:NextFunction) {
   const userToken =  req.cookies.token

   if(!userToken) return res.redirect('/users/login')

    const user  = getUser(userToken)
   if(!user ) return res.redirect('/users/login')

   req.body.user = user 

   next()

}
export{
   restrictTologgedInUsers
}