import { model, Schema, Document } from "mongoose";

export interface UserType extends Document{
    name:string,
    token:string,
    password:string,
    rol:string,
    email:string,
    confirm:boolean,
    code:number | null
    
}

const UserSchema = new Schema({
    name: String,
    token: String,
    password: String,
    rol: String,
    code:Number,
    email: {
        type: String,
        unique: true,
    },
    confirm: {
        type: Boolean,
        default: false
    } 
})

export const User = model<UserType>('User', UserSchema)