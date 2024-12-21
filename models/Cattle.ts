
import { model, PopulatedDoc, Schema, Types } from "mongoose";
import { UserType } from "./User";
import { HealthType } from "./Health";
import { RaceType } from "./Race";
import { FoodType } from "./Food";

export interface CattleType extends Document{
    race:PopulatedDoc<RaceType & Document>,
    health:PopulatedDoc<HealthType & Document> | null,
    user:PopulatedDoc<UserType & Document>,
    weight:number,
    sex:'male'|'female',
    date:string,
    Food: PopulatedDoc<FoodType & Document>
}

const CattleSchema = new Schema({
    name:String,
    race:{
        type:Types.ObjectId,
        ref:'Race',
        default:null
    },
    health:{
        type:Types.ObjectId,
        ref:'Health',
        default:null
    },
    user:{
        type:Types.ObjectId,
        ref:'User',
        default:null
    },
    weight:Number,
    sex:{
        type:String,
        enum:['male','female']
    },
    food:{
        type:Types.ObjectId,
        ref:'Food'
    },
    date:String,

},{
    timestamps:true
})

export const Cattle = model<CattleType>('Cattle', CattleSchema)