import { Document, PopulatedDoc } from "mongoose";
import { model, Schema } from "mongoose";
import { UserType } from "./User";

export const HealthStatusEnum = {
  success: "Saludable",
  middle: "En Recuperacion",
  warning: "Emergencia",
  empty: "Sin Estado",
}

export type HealthStatusE = keyof typeof HealthStatusEnum;

export interface HealthStatusType extends Document{
    status: HealthStatusE,
    User:PopulatedDoc<UserType & Document>,
    value:string
}

const schemaHealthStatus = new Schema({
  status: {
    type: String,
    enum: ['success', 'middle', 'warning','empty'],
  },
  value:String,
  User: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const HealthStatus = model<HealthStatusType>("HealthStatus", schemaHealthStatus);
