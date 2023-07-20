import mongoose, { Document, Model, Schema } from 'mongoose';
import { Department } from '../../../../domain/entities/admin/deparment';
 

export type MongoDBDepartment = Model<Document<any, any, any> & Department>;

// Define the schema for the user collection
const departmetSchema = new Schema<Department>({
    departmentName: {type:String,required:true,trim:true},
    healthProblems:[String]
  }, {
    timestamps: { createdAt: true}
  });

export const departmentModel: MongoDBDepartment = mongoose.connection.model<Document<any, any, any> & Department>('department', departmetSchema);