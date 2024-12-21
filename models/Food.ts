import { model, PopulatedDoc, Schema, Types } from "mongoose";
import { UserType } from "./User";
import { CattleType } from "./Cattle";
import { UnitType } from "./Unit";


export interface FoodType extends Document{
    name:string,
    amount:number,
    unit:PopulatedDoc<UnitType & Document>,
    description:string,
    user:PopulatedDoc<UserType & Document>,
    cattle:PopulatedDoc<CattleType & Document>[],
}

const FoodSchema = new Schema({
    name:String,
    amount:Number,
    unit:{
        type:Types.ObjectId,
        ref:'Unit'
    },
    description:String,
    user:{
        type:Types.ObjectId,
        ref:'User'
    },
    cattle:[{
        type:Types.ObjectId,
        ref:'Cattle',
        default:[]
    }]
}
)

export const Food = model<FoodType>('Food', FoodSchema)