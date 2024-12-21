import { Document, model, PopulatedDoc, Schema, Types } from "mongoose"
import { CattleType } from "./Cattle"
import { UserType } from "./User"

export interface RaceType extends Document{
    name:string,
    origin:string,
    type:string,
    temperature:string,
    features:string,
    cattle:PopulatedDoc<CattleType & Document>[],
    user: PopulatedDoc<UserType & Document>
}

const RaceSchema = new Schema({
    name:String,
    origin: String,
    type:String,
    temperature:String,
    features:String,
    cattle:[{
        type:Types.ObjectId,
        ref:'Cattle',
        default:[]
    }],
    user:{
        type:Types.ObjectId,
        ref:'User'
    }
})
export const Race = model<RaceType>('Race', RaceSchema)