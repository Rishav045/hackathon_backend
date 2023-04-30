const User = require('../models/User');
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')
// const bcrypt = require('bcryptjs')

const login = async(req,res)=>{
    const {email,password}= req.body
    
    if(!email || !password)
    {
        throw new BadRequestError('Please provide both email and password');
    }
   
    
    const user = await User.findOne({email});
    console.log(password)
    if(!user)
    {
        throw new UnauthenticatedError('Wrong Credentials')
    }

    const isAuth= await user.checkPassword(password)
    if(!isAuth)
    {
        throw new UnauthenticatedError('Wrong Credentials')
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({User:{email:user.email},token})
    
}

const register = async(req,res)=>{
    
    const user = await User.create({...req.body})
    // console.log(req.body.password)
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({user:{name:user.name},token})
}

module.exports={login, register}