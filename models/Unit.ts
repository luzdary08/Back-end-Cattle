import { model, PopulatedDoc, Schema, Types } from "mongoose";
import { UserType } from "./User";


export interface UnitType extends Document{
    name:string
}

export const UnitSchema = new Schema({
    name:{
        type:String
    },

})

export const Unit = model<UnitType>('Unit', UnitSchema)