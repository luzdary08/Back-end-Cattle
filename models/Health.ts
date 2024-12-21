import { Document, model, PopulatedDoc, Schema, Types } from "mongoose";
import { CattleType } from "./Cattle";
import { HealthStatusType } from "./HealthStatus";
import { UserType } from "./User";


export interface HealthType extends Document{
    observes:string,
    treatment:string,
    lastDate:string,
    cattle: PopulatedDoc<CattleType & Document>,
    status:PopulatedDoc<HealthStatusType & Document>,
    user:PopulatedDoc<UserType & Document>,
    veterinarian:string
}

const healthSchema = new Schema({
    observes:String,
    treatment:String,
    lastDate:String,
    veterinarian:String,
    cattle:{
        type:Types.ObjectId,
        ref:'Cattle',
    },
    status:{
        type:Types.ObjectId,
        ref:'HealthStatus'
    },
    user:{
        type:Types.ObjectId,
        ref:'User'
    }
})

export const Health = model<HealthType>('Health', healthSchema)


