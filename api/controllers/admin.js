import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs';

export const registerAdmin = async ({fullname, email, photo, password})=>{
    try{
        await User.create({fullname,email,photo,password,isAdmin:true})
        return Promise.resolve()
    }catch(error){
        return Promise.reject({error})
    }
}

export const loginAdmin = async ({email, password}) => {
    try{
        const admin = await User.findOne({email, isAdmin:true})
            const validPassword = bcryptjs.compareSync(password, admin.password);
        if(validPassword)
        return Promise.resolve(admin) 
    }catch(error){
        return Promise.reject({error})
    }
}

export const updateAdmin = async (id,fullname, email, photo) => {
    try{
        const admin = await User.findByIdAndUpdate(id,
            { $set: {fullname, email, photo} },
            { new: true }
        )
        return Promise.resolve(admin)
    }catch(error){
        return Promise.reject({error})
    }
}

export const uploadAdminPicture = async (id, photo) => {
    try{
        const admin = await User.findByIdAndUpdate(id,
            { $set: {photo} },
            { new: true }
        )
        return Promise.resolve(admin)
    }catch(error){
        return Promise.reject({error})
    }
}


export const deleteAdmin = async (id) => {
    try {
        await User.findByIdAndDelete(id)
        Promise.resolve()
    } catch (error) {
        Promise.reject({error})
    }
}